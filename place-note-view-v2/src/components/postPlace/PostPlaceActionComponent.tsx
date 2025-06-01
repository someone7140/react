"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

import { PostPlaceResponse } from "@/graphql/gen/graphql";
import { PostPlaceDeleteDialogComponent } from "@/components/postPlace/dialog/PostPlaceDeleteDialogComponent";
import { POST_PLACE_EDIT_PAGE_PATH } from "@/constants/MenuPathConstants";
import { usePostPlaceInputSessionStore } from "@/hooks/inputSessionStore/usePostPlaceInputSessionStore";

type Props = {
  place: PostPlaceResponse;
  refetchPlaceFunc?: () => void;
  selectActionForPost?: (place: PostPlaceResponse) => void;
};

export const PostPlaceActionComponent: FC<Props> = ({
  place,
  selectActionForPost,
  refetchPlaceFunc,
}) => {
  const router = useRouter();
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const { updatePostPlaceInputSession } = usePostPlaceInputSessionStore();

  return (
    <div className="flex w-[100%] gap-5 justify-center">
      <div>
        <Button
          color="warning"
          onPress={() => {
            // 遷移前に入力のセッションをクリアする
            updatePostPlaceInputSession(undefined);
            router.push(`${POST_PLACE_EDIT_PAGE_PATH}?id=${place.id}`);
          }}
        >
          編集
        </Button>
      </div>
      <div>
        <Button
          color="default"
          onPress={() => {
            setIsOpenDelete(true);
          }}
        >
          削除
        </Button>
        <PostPlaceDeleteDialogComponent
          isOpen={isOpenDelete}
          closeDialog={() => {
            setIsOpenDelete(false);
          }}
          place={place}
          refetchPlaceFunc={refetchPlaceFunc}
        />
      </div>
      {selectActionForPost && (
        <div>
          <Button
            color="secondary"
            onPress={() => {
              selectActionForPost(place);
            }}
          >
            投稿へ進む
          </Button>
        </div>
      )}
    </div>
  );
};
