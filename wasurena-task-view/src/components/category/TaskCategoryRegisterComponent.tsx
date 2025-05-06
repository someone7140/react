"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

import {
  TaskCategoryInputComponent,
  TaskCategoryInputFormValues,
} from "./input/TaskCategoryInputComponent";
import { CATEGORY_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import { useCreateTaskCategoryMutation } from "@/graphql/gen/graphql";

export const TaskCategoryRegisterComponent: FC = ({}) => {
  const [createTaskCategoryMutationResult, createTaskCategoryMutation] =
    useCreateTaskCategoryMutation();
  const router = useRouter();

  const submitRegisterCategory = async (
    formValues: TaskCategoryInputFormValues
  ) => {
    const result = await createTaskCategoryMutation({
      name: formValues.name,
      displayOrder:
        formValues.displayOrder != null ? formValues.displayOrder : null,
    });
    if (!result?.data?.createCategory || result.error) {
      notifications.show({
        id: "submitRegister-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "登録エラー",
        message: "カテゴリーの登録に失敗しました",
        color: "red",
        loading: false,
      });
    } else {
      router.push(`${CATEGORY_LIST_PAGE_PATH}`);
      notifications.show({
        id: "submitRegister-success",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "カテゴリー登録",
        message: "カテゴリー登録しました。",
        color: "green",
        loading: false,
      });
    }
  };

  return (
    <>
      <TaskCategoryInputComponent
        submitTaskCategory={submitRegisterCategory}
        submitDisabled={createTaskCategoryMutationResult.fetching}
      />
    </>
  );
};
