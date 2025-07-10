"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { useAtomValue } from "jotai";

import { TaskInputComponent } from "./input/TaskInputComponent";
import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TASK_DEFINITION_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  DeadLineCheck,
  useCreateTaskDefinitionMutation,
  useGetTaskCategoriesForTaskDefinitionQueryQuery,
} from "@/graphql/gen/graphql";
import { TaskInputFormValues, useTaskUtil } from "@/hooks/useTaskUtil";

export const TaskRegisterComponent: FC = ({}) => {
  const [{ data: categoryData }] =
    useGetTaskCategoriesForTaskDefinitionQueryQuery({
      requestPolicy: "network-only",
    });
  const [createTaskMutationResult, createTaskMutation] =
    useCreateTaskDefinitionMutation();
  const router = useRouter();
  const userAccountState = useAtomValue(userAccountAtom);
  const { getDeadLineCheckSubSettingFromForm } = useTaskUtil();

  const submitRegisterTask = async (formValues: TaskInputFormValues) => {
    const deadLineCheck =
      formValues.displayFlag && formValues.deadLineCheck
        ? (formValues.deadLineCheck as DeadLineCheck)
        : null;

    const notificationFlag =
      formValues.displayFlag &&
      userAccountState?.isLineBotFollow &&
      !!formValues.deadLineCheck
        ? formValues.notificationFlag
        : false;

    const result = await createTaskMutation({
      title: formValues.title,
      displayFlag: formValues.displayFlag,
      notificationFlag: notificationFlag,
      categoryId: formValues.categoryId ?? null,
      deadLineCheck: deadLineCheck,
      deadLineCheckSubSetting: getDeadLineCheckSubSettingFromForm(
        deadLineCheck,
        formValues
      ),
      detail: formValues.detail ?? null,
    });
    if (!result?.data?.createTaskDefinition || result.error) {
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
      router.push(`${TASK_DEFINITION_LIST_PAGE_PATH}`);
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
