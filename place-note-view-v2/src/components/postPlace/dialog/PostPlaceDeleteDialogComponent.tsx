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
  PostPlaceResponse,
  useDeletePostPlaceMutation,
} from "@/graphql/gen/graphql";
import { dialogBoxStyle } from "@/style/CommonStyle";

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  place: PostPlaceResponse;
  refetchPlaceFunc?: () => void;
};

export const PostPlaceDeleteDialogComponent: FC<Props> = ({
  isOpen,
  closeDialog,
  place,
  refetchPlaceFunc,
}) => {
  const [deletePlace, { loading: deletePlaceLoading }] =
    useDeletePostPlaceMutation();

  const clickDelete = async () => {
    const result = await deletePlace({ variables: { id: place.id } });
    if (result.data && !result.errors) {
      refetchPlaceFunc?.();
      toast("場所を削除しました");
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
                「{place.name}」を削除します、よろしいですか。
              </div>
            </ModalBody>
            <ModalFooter className="flex gap-10 justify-center">
              <Button
                color="danger"
                disabled={deletePlaceLoading}
                onPress={clickDelete}
              >
                削除する
              </Button>
              <Button
                color="default"
                onPress={onClose}
                disabled={deletePlaceLoading}
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
