"use client";

import React, { FC, useRef, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";

import {
  ChildrenHandle,
  NovelSettingChildrenComponent,
} from "./NovelSettingChildrenComponent";
import { NovelSettingDeleteDialogComponent } from "../dialog/NovelSettingDeleteDialogComponent";
import { ParentNovelSettingRegisterDialogComponent } from "../dialog/ParentNovelSettingRegisterDialogComponent";
import { Button } from "@/components/ui/button";
import {
  DeleteNovelSettingByIdDocument,
  NovelSettingResponse,
} from "@/graphql/gen/graphql";
import {
  deleteButtonStyle,
  editButtonStyle,
  settingButtonStyle,
  submitButtonStyle,
} from "@/style/FormStyle";
import { novelDescriptionStyle, novelTitleStyle } from "@/style/NovelStyle";

type Props = {
  parentNovelSetting: NovelSettingResponse;
  novelSettings: NovelSettingResponse[];
  refetch: () => void;
};

export const NovelSettingParentComponent: FC<Props> = ({
  parentNovelSetting,
  novelSettings,
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
  const childrenRef = useRef<ChildrenHandle>(null);
  const [deleteNovelSetting, { loading: deleteNovelSettingLoading }] =
    useMutation(DeleteNovelSettingByIdDocument);

  const onDeleteSubmit = async () => {
    const result = await deleteNovelSetting({
      variables: { id: parentNovelSetting.id },
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
        {parentNovelSetting.name}
      </div>
      {parentNovelSetting.attributes.length > 0 && (
        <div className={`mb-2 ml-3`}>
          {parentNovelSetting.attributes.join("、")}
        </div>
      )}
      {parentNovelSetting.description && (
        <div className={`${novelDescriptionStyle()} mb-2 ml-3`}>
          {parentNovelSetting.description}
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
        <Button
          className={settingButtonStyle()}
          onClick={() => {
            childrenRef.current?.addChild();
            setIsHasChildren(true);
          }}
        >
          子設定を追加
        </Button>
        {isHasChildren && (
          <Button
            className={submitButtonStyle()}
            onClick={() => {
              childrenRef.current?.onSubmit();
            }}
          >
            子設定を更新
          </Button>
        )}
      </div>
      {isOpenParentNovelSettingRegisterDialog && (
        <ParentNovelSettingRegisterDialogComponent
          isOpen={isOpenParentNovelSettingRegisterDialog}
          setIsOpen={setIsOpenParentNovelSettingRegisterDialog}
          novelId={parentNovelSetting.novelId}
          refetch={refetch}
          registeredSetting={parentNovelSetting}
        />
      )}
      <NovelSettingChildrenComponent
        parentNovelSetting={parentNovelSetting}
        novelSettings={novelSettings}
        handleRef={childrenRef}
        setIsHasChildren={setIsHasChildren}
      />
      {isOpenDeleteDialog && (
        <NovelSettingDeleteDialogComponent
          isOpen={isOpenDeleteDialog}
          setIsOpen={setIsOpenDeleteDialog}
          onSubmit={onDeleteSubmit}
          registeredSetting={parentNovelSetting}
          disabledFlag={deleteNovelSettingLoading}
        />
      )}
    </div>
  );
};
