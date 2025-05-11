"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { useAtomValue } from "jotai";

import {
  TaskInputComponent,
  TaskInputFormValues,
} from "./input/TaskInputComponent";
import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  DeadLineCheck,
  InputMaybe,
  useCreateTaskMutation,
  useGetTaskCategoriesQuery,
} from "@/graphql/gen/graphql";
import { DeadLineSubCheckDailyHour } from "@/hooks/useTaskUtil";

export const TaskRegisterComponent: FC = ({}) => {
  const [{ data: categoryData }] = useGetTaskCategoriesQuery({
    requestPolicy: "network-only",
  });
  const [createTaskMutationResult, createTaskMutation] =
    useCreateTaskMutation();
  const router = useRouter();
  const userAccountState = useAtomValue(userAccountAtom);

  const submitRegisterTask = async (formValues: TaskInputFormValues) => {
    const deadLinCheck =
      formValues.displayFlag && formValues.deadLineCheck
        ? (formValues.deadLineCheck as DeadLineCheck)
        : null;
    let deadLineCheckSubSetting: InputMaybe<object> | null = null;
    if (
      deadLinCheck === DeadLineCheck.DailyHour &&
      formValues.deadLineCheckSubSettingHour != null
    ) {
      deadLineCheckSubSetting = {
        hourInterval: formValues.deadLineCheckSubSettingHour,
      } as DeadLineSubCheckDailyHour;
    }

    const notificationFlag =
      formValues.displayFlag && userAccountState?.isLineBotFollow
        ? formValues.notificationFlag
        : false;

    const result = await createTaskMutation({
      title: formValues.title,
      displayFlag: formValues.displayFlag,
      notificationFlag: notificationFlag,
      categoryId: formValues.categoryId ?? null,
      deadLineCheck: deadLinCheck,
      deadLineCheckSubSetting: deadLineCheckSubSetting,
      detail: formValues.detail ?? null,
    });
    if (!result?.data?.createTask || result.error) {
      notifications.show({
        id: "submitRegister-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "登録エラー",
        message: "タスクの登録に失敗しました",
        color: "red",
        loading: false,
      });
    } else {
      router.push(`${TOP_PAGE_PATH}`);
      notifications.show({
        id: "submitRegister-success",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "タスク登録",
        message: "タスク登録しました。",
        color: "green",
        loading: false,
      });
    }
  };

  return (
    <>
      <TaskInputComponent
        submitTask={submitRegisterTask}
        submitDisabled={createTaskMutationResult.fetching}
        categoriesData={categoryData?.getTaskCategories ?? undefined}
      />
    </>
  );
};
