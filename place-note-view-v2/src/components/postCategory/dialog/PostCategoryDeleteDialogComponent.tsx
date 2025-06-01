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

import {
  PostCategoryResponse,
  useDeletePostCategoryMutation,
} from "@/graphql/gen/graphql";
import { dialogBoxStyle } from "@/style/CommonStyle";

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  category: PostCategoryResponse;
  refetchCategoryFunc?: () => void;
};

export const PostCategoryDeleteDialogComponent: FC<Props> = ({
  isOpen,
  closeDialog,
  category,
  refetchCategoryFunc,
}) => {
  const [deleteCategory, { loading: deleteCategoryLoading }] =
    useDeletePostCategoryMutation();

  const clickDelete = async () => {
    const result = await deleteCategory({ variables: { id: category.id } });
    if (result.data && !result.errors) {
      refetchCategoryFunc?.();
      toast("カテゴリーを削除しました");
      closeDialog();
    } else {
      toast.error("削除に失敗しました");
    }
  };

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      closeDialog();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className={`${dialogBoxStyle()}`}>
              <div className="flex justify-start text-lg text-wrap break-all">
                「{category.name}」を削除します、よろしいですか。
              </div>
            </ModalBody>
            <ModalFooter className="flex gap-10 justify-center">
              <Button
                color="danger"
                disabled={deleteCategoryLoading}
                onPress={clickDelete}
              >
                削除する
              </Button>
              <Button
                color="default"
                onPress={onClose}
                disabled={deleteCategoryLoading}
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
