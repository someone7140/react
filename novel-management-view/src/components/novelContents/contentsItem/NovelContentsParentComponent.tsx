"use client";

import { FC, useRef, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";

import { Button } from "@/components/ui/button";
import {
  DeleteNovelContentsByIdDocument,
  NovelContentsResponse,
} from "@/graphql/gen/graphql";
import {
  deleteButtonStyle,
  editButtonStyle,
  settingButtonStyle,
  submitButtonStyle,
} from "@/style/FormStyle";
import { novelDescriptionStyle, novelTitleStyle } from "@/style/NovelStyle";
import { ParentNovelContentsRegisterDialogComponent } from "../dialog/ParentNovelContentsRegisterDialogComponent";
import { NovelContentsDeleteDialogComponent } from "../dialog/NovelContentsDeleteDialogComponent";
import {
  ChildrenHandle,
  NovelContentsChildrenComponent,
} from "./NovelContentsChildrenComponent";
import { NovelContentsAccordionComponent } from "../form/NovelContentsAccordionComponent";

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
    undefined,
  );
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const childrenRef = useRef<ChildrenHandle>(null);
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
      {parentNovelContents.contents && (
        <div className="ml-3">
          <NovelContentsAccordionComponent
            contentNode={
              <div className={`${novelDescriptionStyle()} ml-2 mb-2`}>
                {parentNovelContents.contents}
              </div>
            }
          />
        </div>
      )}
      <div className="flex gap-4 ml-3">
        <Button
          className={editButtonStyle()}
          onClick={() => {
            setIsOpenParentNovelSettingRegisterDialog(true);
          }}
        >
          内容編集
        </Button>
        <Button
          className={deleteButtonStyle()}
          onClick={() => {
            setIsOpenDeleteDialog(true);
          }}
        >
          削除
        </Button>
        <Button
          className={settingButtonStyle()}
          onClick={() => {
            childrenRef.current?.addChild();
            setIsHasChildren(true);
          }}
        >
          子の見出しを追加
        </Button>
        {isHasChildren && (
          <Button
            className={submitButtonStyle()}
            onClick={() => {
              childrenRef.current?.onSubmit();
            }}
            disabled={!!childrenRef.current?.isChildrenRegisterDisabled()}
          >
            子見出しを更新
          </Button>
        )}
      </div>
      {isOpenParentNovelSettingRegisterDialog && (
        <ParentNovelContentsRegisterDialogComponent
          isOpen={isOpenParentNovelSettingRegisterDialog}
          setIsOpen={setIsOpenParentNovelSettingRegisterDialog}
          novelId={parentNovelContents.novelId}
          refetch={refetch}
          registeredContents={parentNovelContents}
        />
      )}
      <NovelContentsChildrenComponent
        parentNovelContents={parentNovelContents}
        novelContents={novelContents}
        handleRef={childrenRef}
        setIsHasChildren={setIsHasChildren}
      />
      {isOpenDeleteDialog && (
        <NovelContentsDeleteDialogComponent
          isOpen={isOpenDeleteDialog}
          setIsOpen={setIsOpenDeleteDialog}
          onSubmit={onDeleteSubmit}
          registeredContents={parentNovelContents}
          disabledFlag={deleteNovelContentsLoading}
        />
      )}
    </div>
  );
};
