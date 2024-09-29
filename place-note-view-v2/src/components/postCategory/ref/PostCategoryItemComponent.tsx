"use client";

import React, { FC, useState } from "react";
import { Button, Checkbox } from "@material-tailwind/react";

import { PostCategoryDeleteDialogComponent } from "@/components/postCategory/dialog/PostCategoryDeleteDialogComponent";
import { PostCategoryResponse } from "@/graphql/gen/graphql";
import { detailTextStyle } from "@/style/PostStyle";

type Props = {
  category: PostCategoryResponse;
  displayActionButton?: boolean;
  displayCheck?: boolean;
  checkedCategoryIds: string[];
  updateCategoryIdsFunc?: (id: string) => void;
  refetchCategoryFunc?: () => void;
};

export const PostCategoryItemComponent: FC<Props> = ({
  category,
  displayActionButton,
  displayCheck,
  checkedCategoryIds = [],
  updateCategoryIdsFunc,
  refetchCategoryFunc,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const isParent = !category.parentCategoryId;

  return (
    <>
      <div className="flex items-center">
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
        <div className="flex gap-10 justify-center mt-2">
          <Button color="orange">編集</Button>
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
    </>
  );
};
