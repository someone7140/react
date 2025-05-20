"use client";

import React, { FC } from "react";
import { notifications } from "@mantine/notifications";
import { Button, Modal } from "@mantine/core";

import {
  TaskExecuteResponse,
  useDeleteTaskExecuteMutation,
} from "@/graphql/gen/graphql";

type Props = {
  taskExec?: TaskExecuteResponse;
  closeModal: () => void;
  refetch: () => void;
};

export const TaskExecutionDeleteModalComponent: FC<Props> = ({
  taskExec,
  closeModal,
  refetch,
}) => {
  const [deleteTaskExecuteMutationResult, deleteTaskExecuteMutation] =
    useDeleteTaskExecuteMutation();

  const onModalClose = () => {
    if (!deleteTaskExecuteMutationResult.fetching) {
      closeModal();
    }
  };

  const submitDeleteTaskExecute = async () => {
    if (taskExec) {
      const result = await deleteTaskExecuteMutation({
        taskExecuteId: taskExec.id,
      });
      if (!result?.data?.deleteTaskExecute || result.error) {
        notifications.show({
          id: "submitRegister-error",
          position: "top-center",
          withCloseButton: true,
          autoClose: 5000,
          title: "削除エラー",
          message: "実施履歴の削除に失敗しました",
          color: "red",
          loading: false,
        });
      } else {
        notifications.show({
          id: "submitRegister-success",
          position: "top-center",
          withCloseButton: true,
          autoClose: 5000,
          title: "実施履歴削除",
          message: "実施履歴を削除しました。",
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
      opened={!!taskExec}
      onClose={onModalClose}
      title="タスク実施履歴除除"
      className="max-w-[310px] min-w-[310px]"
    >
      <div>
        タスクの実施履歴を削除します。よろしいですか。
        <div className="flex justify-center mt-3">
          <Button
            color="gray"
            onClick={async () => {
              await submitDeleteTaskExecute();
            }}
            disabled={deleteTaskExecuteMutationResult.fetching}
          >
            削除
          </Button>
        </div>
      </div>
    </Modal>
  );
};
