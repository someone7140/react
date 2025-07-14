"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

import { PostPlaceResponse } from "@/graphql/gen/graphql";
import { PostPlaceDeleteDialogComponent } from "@/components/postPlace/dialog/PostPlaceDeleteDialogComponent";
import {
  POST_LIST_PAGE_PATH,
  POST_PLACE_EDIT_PAGE_PATH,
} from "@/constants/MenuPathConstants";
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
    <div className="flex flex-col gap-3 mr-5">
      <div className="flex w-[100%] gap-7 justify-center">
        <div>
          <Button
            className="w-[100px]"
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
            className="w-[100px]"
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
      </div>
      <div className="flex w-[100%] gap-7 justify-center">
        {selectActionForPost && (
          <div>
            <Button
              className="w-[100px]"
              color="secondary"
              onPress={() => {
                selectActionForPost(place);
              }}
            >
              投稿を行う
            </Button>
          </div>
        )}
        <Button
          className="w-[100px]"
          color="primary"
          onPress={() => {
            router.push(`${POST_LIST_PAGE_PATH}?placeId=${place.id}`);
          }}
        >
          投稿一覧へ
        </Button>
      </div>
    </div>
  );
};
