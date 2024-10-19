"use client";

import React, { FC } from "react";
import { toast } from "react-toastify";
import { Button, Dialog } from "@material-tailwind/react";

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

  return (
    <Dialog open={isOpen} handler={closeDialog}>
      <div className={`${dialogBoxStyle()}`}>
        <div className="flex justify-start text-lg text-wrap break-all">
          「{place.name}」を削除します、よろしいですか。
        </div>
        <div className="flex gap-10 justify-center mt-3">
          <Button
            color="pink"
            disabled={deletePlaceLoading}
            onClick={clickDelete}
          >
            削除する
          </Button>
          <Button
            color="blue-gray"
            onClick={closeDialog}
            disabled={deletePlaceLoading}
          >
            キャンセル
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
