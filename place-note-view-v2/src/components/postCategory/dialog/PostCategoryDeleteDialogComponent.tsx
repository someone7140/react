"use client";

import React, { FC } from "react";
import { toast } from "react-toastify";
import { Button, Dialog } from "@material-tailwind/react";

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

  return (
    <Dialog open={isOpen} handler={closeDialog}>
      <div className={`${dialogBoxStyle()}`}>
        <div className="flex justify-start text-lg text-wrap break-all">
          「{category.name}」を削除します、よろしいですか。
        </div>
        <div className="flex gap-10 justify-center mt-3">
          <Button
            color="pink"
            loading={deleteCategoryLoading}
            onClick={clickDelete}
          >
            削除する
          </Button>
          <Button
            color="blue-gray"
            onClick={closeDialog}
            disabled={deleteCategoryLoading}
          >
            キャンセル
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
