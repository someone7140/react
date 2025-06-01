"use client";

import React, { FC } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@heroui/react";

import { PostCategoryDisplayComponent } from "@/components/postCategory/ref/PostCategoryDisplayComponent";
import { PostCategoryResponse } from "@/graphql/gen/graphql";
import { dialogBoxStyle } from "@/style/CommonStyle";

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  categories: PostCategoryResponse[];
  updateCategoryIdsFunc?: (id: string) => void;
  selectedIds: string[];
};

export const PostCategorySelectDialogComponent: FC<Props> = ({
  isOpen,
  closeDialog,
  categories,
  updateCategoryIdsFunc,
  selectedIds,
}) => {
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
            <ModalBody
              className={`${dialogBoxStyle({ type: "scroll" })} max-h-[75vh]`}
            >
              <div className="flex justify-start mb-3 w-[99%]">
                <PostCategoryDisplayComponent
                  categories={categories}
                  updateCategoryIdsFunc={updateCategoryIdsFunc}
                  displayCheck
                  checkedCategoryIds={selectedIds}
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center mb-3">
              <Button color="default" onPress={onClose}>
                閉じる
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
