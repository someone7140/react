"use client";

import { FC } from "react";
import { Button, Modal } from "@heroui/react";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  submitExec: () => Promise<void>;
};

export const PostDeleteConfirmModalComponent: FC<Props> = ({
  isOpen,
  setIsOpen,
  submitExec,
}) => {
  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>確認</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div>投稿を削除します。よろしいでしょうか。</div>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                キャンセル
              </Button>
              <Button
                onPress={() => {
                  submitExec();
                  setIsOpen(false);
                }}
              >
                削除する
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
