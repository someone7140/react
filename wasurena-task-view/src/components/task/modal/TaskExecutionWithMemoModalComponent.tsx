"use client";

import React, { FC } from "react";
import { Button, Modal, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

import { TaskCheckForListResponse } from "@/graphql/gen/graphql";
import { formAreaStyle } from "@/style/formStyle";

type Props = {
  checkTask: TaskCheckForListResponse;
  isOpen: boolean;
  closeModal: () => void;
  execRegister: (memo?: string) => void;
  submitDisabled?: boolean;
};

export type MemoInputFormValues = {
  memo: string;
};

export const TaskExecutionWithMemoModalComponent: FC<Props> = ({
  checkTask,
  isOpen,
  closeModal,
  execRegister,
  submitDisabled,
}) => {
  const form = useForm<MemoInputFormValues>({
    mode: "uncontrolled",
    initialValues: {
      memo: "",
    },
  });

  const submitTaskExecute = async (formValues: MemoInputFormValues) => {
    execRegister(formValues.memo);
  };

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title="タスク実施"
      className="max-w-[310px] min-w-[310px]"
      closeOnClickOutside={false}
    >
      <form
        onSubmit={form.onSubmit((values) => submitTaskExecute(values))}
        className={formAreaStyle()}
      >
        <div>「{checkTask.title}」の実施を登録します </div>
        <Textarea
          data-autofocus
          label="メモ"
          key={form.key("memo")}
          {...form.getInputProps("memo")}
          className={`w-[90%] ml-6`}
          autosize
          minRows={3}
          maxRows={7}
        />
        <div className="flex justify-center mt-2">
          <Button type="submit" color="blue" disabled={submitDisabled}>
            登録
          </Button>
        </div>
      </form>
    </Modal>
  );
};
