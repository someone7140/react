"use client";

import { FC, useRef, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";

import { Button } from "@/components/ui/button";
import {
  DeleteNovelContentsByIdDocument,
  NovelContentsResponse,
} from "@/graphql/gen/graphql";
import { deleteButtonStyle, editButtonStyle } from "@/style/FormStyle";
import { novelDescriptionStyle, novelTitleStyle } from "@/style/NovelStyle";

type Props = {
  parentNovelContents: NovelContentsResponse;
  novelContents: NovelContentsResponse[];
  refetch: () => void;
};

export const NovelContentsParentComponent: FC<Props> = ({
  parentNovelContents,
  novelContents,
  refetch,
}) => {
  const [
    isOpenParentNovelSettingRegisterDialog,
    setIsOpenParentNovelSettingRegisterDialog,
  ] = useState<boolean>(false);
  const [isHasChildren, setIsHasChildren] = useState<boolean | undefined>(
    undefined
  );
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  // const childrenRef = useRef<ChildrenHandle>(null);
  const [deleteNovelContents, { loading: deleteNovelContentsLoading }] =
    useMutation(DeleteNovelContentsByIdDocument);

  const onDeleteSubmit = async () => {
    const result = await deleteNovelContents({
      variables: { id: parentNovelContents.id },
    });
    if (result.error) {
      toast.error("削除時にエラーが発生しました");
    } else {
      refetch();
      toast.info("削除しました");
    }
  };

  return (
    <div>
      <div className={`${novelTitleStyle()} mb-2`}>
        {parentNovelContents.chapterName}
      </div>
      {parentNovelContents.description && (
        <div className={`${novelDescriptionStyle()} mb-2 ml-3`}>
          {parentNovelContents.description}
        </div>
      )}
      {parentNovelContents && (
        <div className={`${novelDescriptionStyle()} mb-2 ml-3`}>
          {parentNovelContents.description}
        </div>
      )}
      <div className="flex gap-4 ml-3">
        <Button
          className={editButtonStyle()}
          onClick={() => {
            setIsOpenParentNovelSettingRegisterDialog(true);
          }}
        >
          設定名・詳細編集
        </Button>
        <Button
          className={deleteButtonStyle()}
          onClick={() => {
            setIsOpenDeleteDialog(true);
          }}
        >
          削除
        </Button>
      </div>
    </div>
  );
};
