"use client";

import React, { FC } from "react";
import { notifications } from "@mantine/notifications";
import { Button, Modal } from "@mantine/core";

import {
  TaskCategoryResponse,
  useDeleteTaskCategoryMutation,
} from "@/graphql/gen/graphql";

type Props = {
  category: TaskCategoryResponse;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
};

export const TaskCategoryDeleteModalComponent: FC<Props> = ({
  category,
  isOpen,
  setIsOpen,
  refetch,
}) => {
  const [deleteCategoryMutationResult, deleteCategoryMutation] =
    useDeleteTaskCategoryMutation();

  const onModalClose = () => {
    if (!deleteCategoryMutationResult.fetching) {
      setIsOpen(false);
    }
  };

  const submitDeleteCategory = async () => {
    const result = await deleteCategoryMutation({
      id: category.id,
    });
    if (!result?.data?.deleteCategory || result.error) {
      notifications.show({
        id: "submitRegister-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "削除エラー",
        message: "カテゴリーの削除に失敗しました",
        color: "red",
        loading: false,
      });
    } else {
      notifications.show({
        id: "submitRegister-success",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "カテゴリー削除",
        message: "カテゴリーを削除しました。",
        color: "green",
        loading: false,
      });
      refetch();
      onModalClose();
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onModalClose}
      title="カテゴリー削除"
      className="max-w-[310px] min-w-[310px]"
    >
      <div>
        {category.name}を削除します。よろしいですか。
        <div className="flex justify-center mt-3">
          <Button
            color="gray"
            onClick={async () => {
              await submitDeleteCategory();
            }}
            disabled={deleteCategoryMutationResult.fetching}
          >
            削除
          </Button>
        </div>
      </div>
    </Modal>
  );
};
