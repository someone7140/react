"use client";

import React, { FC, useState } from "react";

import { Button, Modal } from "flowbite-react";
import { deletePostCategory } from "@/gen/placeNotePostCategoryService-PostCategoryService_connectquery";
import { errorMessageStyle } from "@/style/MessageStyle";
import { useMutation } from "@tanstack/react-query";
import { ConnectError } from "@bufbuild/connect";
import { toast } from "react-toastify";

type Props = {
  categoryId?: string;
  name?: string;
  onClose: () => void;
  refetch: () => void;
};

export const DeleteCategoryModalComponent: FC<Props> = ({
  categoryId,
  name,
  onClose,
  refetch,
}) => {
  const [errMsg, setErrMsg] = useState<string | undefined>(undefined);
  const {
    mutationFn: deletePostCategoryMutationFn,
    onError: deletePostCategoryMutationOnError,
  } = deletePostCategory.useMutation({
    onError: (err) => {
      setErrMsg("削除時にエラーが発生しました");
    },
  });
  const { mutate: deletePostCategoryMutate, isPending: deleteLoading } =
    useMutation<void, ConnectError>({
      mutationFn: async () => {
        setErrMsg(undefined);
        await deletePostCategoryMutationFn({ id: categoryId });
        toast("カテゴリーを削除しました");
        refetch();
        onClose();
      },
      onError: (err) => {
        if (deletePostCategoryMutationOnError) {
          deletePostCategoryMutationOnError(err);
        }
      },
    });

  const closeModal = () => {
    if (!deleteLoading) {
      onClose();
    }
  };

  return (
    <Modal show={!!categoryId && !!name} onClose={closeModal} dismissible>
      <Modal.Header>カテゴリー削除</Modal.Header>
      <Modal.Body>
        <span>「{name}」を削除します</span>
        {errMsg && (
          <div className={`mt-2 ${errorMessageStyle()}`}>{errMsg}</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button color="dark" pill onClick={() => deletePostCategoryMutate()}>
          削除
        </Button>
        <Button color="gray" pill onClick={closeModal}>
          キャンセル
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
