"use client";

import { FC, useState } from "react";
import { Button, Modal, toast } from "@heroui/react";
import { useMutation } from "@apollo/client/react";

import { MarkDownInputComponent } from "@/components/common/MarkDownInputComponent";
import { AddAdditionalInfoToPostDocument } from "@/graphql/gen/graphql";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  postId: string;
  refetch: () => void;
};

export const PostAddAdditionalInfoModalComponent: FC<Props> = ({
  isOpen,
  setIsOpen,
  postId,
  refetch,
}) => {
  const [markdownContent, setMarkdownContent] = useState("");

  const [addAdditionalInfo, { loading }] = useMutation(
    AddAdditionalInfoToPostDocument,
  );

  const handleSubmit = async () => {
    if (!markdownContent.trim()) {
      toast.danger("内容を入力してください。");
      return;
    }

    try {
      const result = await addAdditionalInfo({
        variables: {
          id: postId,
          additionalInfo: markdownContent,
        },
      });

      if (result.error || !result.data?.addAdditionalInfoToPost) {
        toast.danger("補足情報の追加に失敗しました。");
        return;
      }

      toast.success("補足情報を追加しました。");
      setMarkdownContent("");
      setIsOpen(false);
      refetch();
    } catch (error) {
      toast.danger("補足情報の追加に失敗しました。");
    }
  };

  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[380px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>補足情報の追加</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4">
                <MarkDownInputComponent
                  fieldName="additionalInfo"
                  width={310}
                  onContentChange={(content) => setMarkdownContent(content)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onPress={() => setIsOpen(false)}>
                キャンセル
              </Button>
              <Button onPress={handleSubmit} isPending={loading}>
                追加
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
