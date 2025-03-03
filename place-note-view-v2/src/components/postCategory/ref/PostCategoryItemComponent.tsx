"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox } from "@material-tailwind/react";

import { POST_CATEGORY_EDIT_PAGE_PATH } from "@/constants/MenuPathConstants";
import { PostCategoryDeleteDialogComponent } from "@/components/postCategory/dialog/PostCategoryDeleteDialogComponent";
import { usePostCategoryInputSessionStore } from "@/hooks/inputSessionStore/usePostCategoryInputSessionStore";
import { PostCategoryResponse } from "@/graphql/gen/graphql";
import { formSubmitAreaStyle } from "@/style/FormStyle";
import { detailTextStyle } from "@/style/PostStyle";

type Props = {
  category: PostCategoryResponse;
  displayActionButton?: boolean;
  displaySelectButton?: boolean;
  displayCheck?: boolean;
  checkedCategoryIds: string[];
  updateCategoryIdsFunc?: (id: string) => void;
  refetchCategoryFunc?: () => void;
};

export const PostCategoryItemComponent: FC<Props> = ({
  category,
  displayActionButton,
  displaySelectButton,
  displayCheck,
  checkedCategoryIds = [],
  updateCategoryIdsFunc,
  refetchCategoryFunc,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const { updatePostCategoryInputSession } = usePostCategoryInputSessionStore();
  const router = useRouter();
  const isParent = !category.parentCategoryId;

  return (
    <div className="w-[100%]">
      <div className="flex flex-row justify-start items-center w-[100%]">
        {displayCheck && (
          <Checkbox
            checked={checkedCategoryIds.some((id) => id === category.id)}
            onChange={() => {
              updateCategoryIdsFunc?.(category.id);
            }}
            crossOrigin={undefined}
          />
        )}
        <div
          className={`text-wrap break-all ${
            isParent ? "text-black text-2xl" : "text-lime-800 text-xl"
          }`}
        >
          {category.name}
        </div>
      </div>
      <div
        className={`mt-2 ${detailTextStyle()} ${
          displayCheck ? "ml-7" : "ml-2"
        }`}
      >
        {category.detail}
      </div>
      {displayActionButton && (
        <div className={formSubmitAreaStyle()}>
          <Button
            color="orange"
            onClick={() => {
              updatePostCategoryInputSession(undefined);
              router.push(`${POST_CATEGORY_EDIT_PAGE_PATH}?id=${category.id}`);
            }}
          >
            編集
          </Button>
          <Button
            color="blue-gray"
            onClick={() => {
              setIsDeleteOpen(true);
            }}
          >
            削除
          </Button>
          <PostCategoryDeleteDialogComponent
            isOpen={isDeleteOpen}
            closeDialog={() => {
              setIsDeleteOpen(false);
            }}
            category={category}
            refetchCategoryFunc={refetchCategoryFunc}
          />
        </div>
      )}
      {displaySelectButton && (
        <div className={formSubmitAreaStyle()}>
          <Button
            color="orange"
            onClick={() => {
              updateCategoryIdsFunc?.(category.id);
            }}
          >
            選択
          </Button>
        </div>
      )}
    </div>
  );
};
