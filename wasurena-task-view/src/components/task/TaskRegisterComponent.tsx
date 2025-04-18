"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

import {
  TaskInputComponent,
  TaskInputFormValues,
} from "./input/TaskInputComponent";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { DeadLineCheck, useCreateTaskMutation } from "@/graphql/gen/graphql";

export const TaskRegisterComponent: FC = ({}) => {
  const [createTaskMutationResult, createTaskMutation] =
    useCreateTaskMutation();
  const router = useRouter();

  const submitRegisterUser = async (formValues: TaskInputFormValues) => {
    const result = await createTaskMutation({
      title: formValues.title,
      displayFlag: formValues.displayFlag,
      notificationFlag: false,
      deadLineCheck:
        formValues.displayFlag && formValues.deadLineCheck
          ? (formValues.deadLineCheck as DeadLineCheck)
          : null,
      deadLineCheckSubSetting: formValues.displayFlag
        ? formValues.deadLineCheckSubSetting
        : null,
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
        submitTask={submitRegisterUser}
        submitDisabled={createTaskMutationResult.fetching}
      />
    </>
  );
};
