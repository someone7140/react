"use client";

import React, { FC, useState } from "react";

import { Button, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ConnectError } from "@bufbuild/connect";

import { deletePostPlace } from "@/gen/placeNotePostPlaceService-PostPlaceService_connectquery";
import { errorMessageStyle } from "@/style/MessageStyle";

type Props = {
  placeId?: string;
  name?: string;
  onClose: () => void;
  refetch: () => void;
};

export const DeletePlaceModalComponent: FC<Props> = ({
  placeId,
  name,
  onClose,
  refetch,
}) => {
  const [errMsg, setErrMsg] = useState<string | undefined>(undefined);
  const {
    mutationFn: deletePostPlaceMutationFn,
    onError: deletePostPlaceMutationOnError,
  } = deletePostPlace.useMutation({
    onError: (err) => {
      setErrMsg("削除時にエラーが発生しました");
    },
  });
  const { mutate: deletePostPlaceMutate, isPending: deleteLoading } =
    useMutation<void, ConnectError>({
      mutationFn: async () => {
        setErrMsg(undefined);
        await deletePostPlaceMutationFn({ id: placeId });
        toast("カテゴリーを削除しました");
        refetch();
        onClose();
      },
      onError: (err) => {
        if (deletePostPlaceMutationOnError) {
          deletePostPlaceMutationOnError(err);
        }
      },
    });

  const closeModal = () => {
    if (!deleteLoading) {
      onClose();
    }
  };

  return (
    <Modal show={!!placeId && !!name} onClose={closeModal} dismissible>
      <Modal.Header>場所削除</Modal.Header>
      <Modal.Body>
        <span>「{name}」を削除します。紐づく投稿も削除されます。</span>
        {errMsg && (
          <div className={`mt-2 ${errorMessageStyle()}`}>{errMsg}</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button color="dark" pill onClick={() => deletePostPlaceMutate()}>
          削除
        </Button>
        <Button color="gray" pill onClick={closeModal}>
          キャンセル
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
