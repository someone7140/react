"use client";

import React, { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { useAtomValue } from "jotai";

import { TaskInputComponent } from "./input/TaskInputComponent";
import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TASK_DEFINITION_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  DeadLineCheck,
  useGetTaskDefinitionByIdAndCategoryQuery,
  useUpdateTaskDefinitionMutation,
} from "@/graphql/gen/graphql";
import { TaskInputFormValues, useTaskUtil } from "@/hooks/useTaskUtil";

type Props = {
  id: string;
};

export const TaskEditComponent: FC<Props> = ({ id }) => {
  const [{ data: taskAndCategoryData, error }] =
    useGetTaskDefinitionByIdAndCategoryQuery({
      variables: { taskDefinitionId: id },
      requestPolicy: "network-only",
    });
  const [updateTaskMutationResult, updateTaskMutation] =
    useUpdateTaskDefinitionMutation();
  const router = useRouter();
  const userAccountState = useAtomValue(userAccountAtom);
  const { getDeadLineCheckSubSettingFromForm } = useTaskUtil();

  const submitEditTask = async (formValues: TaskInputFormValues) => {
    const deadLineCheck =
      formValues.displayFlag && formValues.deadLineCheck
        ? (formValues.deadLineCheck as DeadLineCheck)
        : null;

    const notificationFlag =
      formValues.displayFlag && userAccountState?.isLineBotFollow
        ? formValues.notificationFlag
        : false;

    const result = await updateTaskMutation({
      id: id,
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
    if (!result?.data?.updateTaskDefinition || result.error) {
      notifications.show({
        id: "submitEdit-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "更新エラー",
        message: "タスクの更新に失敗しました",
        color: "red",
        loading: false,
      });
    } else {
      notifications.show({
        id: "submitEdit-success",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "タスク更新",
        message: "タスク更新しました。",
        color: "green",
        loading: false,
      });
      router.push(`${TASK_DEFINITION_LIST_PAGE_PATH}`);
    }
  };

  useEffect(() => {
    if (error) {
      notifications.show({
        id: "getTask-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "取得エラー",
        message: "タスクが取得できませんでした",
        color: "red",
        loading: false,
      });
    }
  }, [error]);

  const categoryData = taskAndCategoryData?.getTaskCategories;
  const registeredTaskData = taskAndCategoryData?.getTaskDefinitionById;

  return (
    <>
      {registeredTaskData && (
        <TaskInputComponent
          submitTask={submitEditTask}
          submitDisabled={updateTaskMutationResult.fetching}
          categoriesData={categoryData ?? undefined}
          registeredTask={registeredTaskData}
        />
      )}
    </>
  );
};
