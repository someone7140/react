"use client";

import React, { FC } from "react";
import { notifications } from "@mantine/notifications";
import { Button, Modal } from "@mantine/core";

import {
  TaskDefinitionResponse,
  useDeleteTaskDefinitionMutation,
} from "@/graphql/gen/graphql";

type Props = {
  task?: TaskDefinitionResponse;
  closeModal: () => void;
  refetch: () => void;
};

export const TaskDefinitionDeleteModalComponent: FC<Props> = ({
  task,
  closeModal,
  refetch,
}) => {
  const [deleteTaskMutationResult, deleteTaskMutation] =
    useDeleteTaskDefinitionMutation();

  const onModalClose = () => {
    if (!deleteTaskMutationResult.fetching) {
      closeModal();
    }
  };

  const submitDeleteTask = async () => {
    if (task) {
      const result = await deleteTaskMutation({
        id: task.id,
      });
      if (!result?.data?.deleteTaskDefinition || result.error) {
        notifications.show({
          id: "submitRegister-error",
          position: "top-center",
          withCloseButton: true,
          autoClose: 5000,
          title: "削除エラー",
          message: "タスクの削除に失敗しました",
          color: "red",
          loading: false,
        });
      } else {
        notifications.show({
          id: "submitRegister-success",
          position: "top-center",
          withCloseButton: true,
          autoClose: 5000,
          title: "タスク削除",
          message: "タスクを削除しました。",
          color: "green",
          loading: false,
        });
        refetch();
        onModalClose();
      }
    }
  };

  return (
    <Modal
      opened={!!task}
      onClose={onModalClose}
      title="タスク削除"
      className="max-w-[310px] min-w-[310px]"
    >
      <div>
        {task?.title}を削除します。よろしいですか。
        <div className="flex justify-center mt-3">
          <Button
            color="gray"
            onClick={async () => {
              await submitDeleteTask();
            }}
            disabled={deleteTaskMutationResult.fetching}
          >
            削除
          </Button>
        </div>
      </div>
    </Modal>
  );
};
