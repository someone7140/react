"use client";

import React, { FC } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@heroui/react";

import { PostResponse, useDeletePostMutation } from "@/graphql/gen/graphql";
import { dialogBoxStyle } from "@/style/CommonStyle";

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  post: PostResponse;
  refetchPostFunc?: () => void;
};

export const PostDeleteDialogComponent: FC<Props> = ({
  isOpen,
  closeDialog,
  post,
  refetchPostFunc,
}) => {
  const [deletePost, { loading: deletePostLoading }] = useDeletePostMutation();

  const clickDelete = async () => {
    const result = await deletePost({ variables: { id: post.id } });
    if (result.data && !result.errors) {
      refetchPostFunc?.();
      toast("投稿を削除しました");
      closeDialog();
    } else {
      toast.error("削除に失敗しました");
    }
  };

  const onOpenChange = (isOpenChange: boolean) => {
    if (!isOpenChange) closeDialog();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className={`${dialogBoxStyle()}`}>
              <div className="flex justify-start text-lg text-wrap break-all">
                「{post.title}」を削除します、よろしいですか。
              </div>
            </ModalBody>
            <ModalFooter className="flex gap-10 justify-center mt-3">
              <Button
                color="danger"
                disabled={deletePostLoading}
                onPress={clickDelete}
              >
                削除する
              </Button>
              <Button
                color="default"
                onPress={onClose}
                disabled={deletePostLoading}
              >
                キャンセル
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
