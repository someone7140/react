"use client";

import React, { FC } from "react";
import { toast } from "react-toastify";
import { Button, Dialog } from "@material-tailwind/react";

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

  return (
    <Dialog open={isOpen} handler={closeDialog}>
      <div className={`${dialogBoxStyle()}`}>
        <div className="flex justify-start text-lg text-wrap break-all">
          「{post.title}」を削除します、よろしいですか。
        </div>
        <div className="flex gap-10 justify-center mt-3">
          <Button
            color="pink"
            disabled={deletePostLoading}
            onClick={clickDelete}
          >
            削除する
          </Button>
          <Button
            color="blue-gray"
            onClick={closeDialog}
            disabled={deletePostLoading}
          >
            キャンセル
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
