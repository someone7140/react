"use client";

import React, { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";

import {
  TaskCategoryInputComponent,
  TaskCategoryInputFormValues,
} from "./input/TaskCategoryInputComponent";
import { CATEGORY_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  useGetTaskCategoryByIdQuery,
  useUpdateTaskCategoryMutation,
} from "@/graphql/gen/graphql";

type Props = {
  id: string;
};

export const TaskCategoryEditComponent: FC<Props> = ({ id }) => {
  const [{ data, fetching, error }] = useGetTaskCategoryByIdQuery({
    variables: { taskCategoryId: id },
    requestPolicy: "network-only",
  });
  const [updateTaskCategoryMutationResult, updateTaskCategoryMutation] =
    useUpdateTaskCategoryMutation();
  const router = useRouter();

  const submitEditCategory = async (
    formValues: TaskCategoryInputFormValues
  ) => {
    const result = await updateTaskCategoryMutation({
      id: id,
      name: formValues.name,
      displayOrder:
        formValues.displayOrder != null ? formValues.displayOrder : null,
    });
    if (!result?.data?.updateCategory || result.error) {
      notifications.show({
        id: "submitEdit-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "編集エラー",
        message: "カテゴリーの編集に失敗しました",
        color: "red",
        loading: false,
      });
    } else {
      router.push(`${CATEGORY_LIST_PAGE_PATH}`);
      notifications.show({
        id: "submitEdit-success",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "カテゴリー編集",
        message: "カテゴリー編集しました。",
        color: "green",
        loading: false,
      });
    }
  };

  useEffect(() => {
    if (error) {
      notifications.show({
        id: "getCategory-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "取得エラー",
        message: "カテゴリーが取得できませんでした",
        loading: false,
      });
    }
  }, [error]);

  if (fetching) {
    return <Loader size={30} />;
  }

  const categoryData = data?.getTaskCategoryById;

  return (
    <>
      {categoryData && (
        <TaskCategoryInputComponent
          submitTaskCategory={submitEditCategory}
          submitDisabled={updateTaskCategoryMutationResult.fetching}
          registeredCategory={categoryData}
        />
      )}
    </>
  );
};
