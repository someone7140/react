"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

import { PostPlaceResponse } from "@/graphql/gen/graphql";
import { POST_PLACE_EDIT_PAGE_PATH } from "@/components/menu/constants/MenuPathConstants";
import { PostPlaceDeleteDialogComponent } from "@/components/postPlace/dialog/PostPlaceDeleteDialogComponent";

type Props = {
  place: PostPlaceResponse;
  actionType: "update" | "select";
  refetchPlaceFunc?: () => void;
};

export const PostPlaceActionComponent: FC<Props> = ({
  place,
  actionType,
  refetchPlaceFunc,
}) => {
  const router = useRouter();
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  return (
    <div className="flex w-[100%] gap-5 justify-center">
      {actionType === "select" && (
        <Button color="orange" onClick={() => {}}>
          選択
        </Button>
      )}
      {actionType === "update" && (
        <>
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
          </div>
          <PostPlaceDeleteDialogComponent
            isOpen={isOpenDelete}
            closeDialog={() => {
              setIsOpenDelete(false);
            }}
            place={place}
            refetchPlaceFunc={refetchPlaceFunc}
          />
        </>
      )}
    </div>
  );
};
