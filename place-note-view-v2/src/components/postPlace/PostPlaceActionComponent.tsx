"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

import { PostPlaceResponse } from "@/graphql/gen/graphql";
import { PostPlaceDeleteDialogComponent } from "@/components/postPlace/dialog/PostPlaceDeleteDialogComponent";
import { POST_PLACE_EDIT_PAGE_PATH } from "@/constants/MenuPathConstants";

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

  return (
    <div className="flex w-[100%] gap-5 justify-center">
      <div>
        <Button
          color="orange"
          onClick={() => {
            router.push(`${POST_PLACE_EDIT_PAGE_PATH}?id=${place.id}`);
          }}
        >
          編集
        </Button>
      </div>
      <div>
        <Button
          color="blue-gray"
          onClick={() => {
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
            color="teal"
            onClick={() => {
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
