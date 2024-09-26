"use client";

import React, { FC } from "react";

import { PostCategoryActionComponent } from "@/components/postCategory/ref/PostCategoryActionComponent";
import { PostCategoryResponse } from "@/graphql/gen/graphql";
import { detailTextStyle } from "@/style/PostStyle";
import { getRootCategoryList } from "@/utils/postUtil";

type Props = {
  categories: PostCategoryResponse[];
  displayActionButton?: boolean;
  displayCheck?: boolean;
  checkedCategoryIds?: string[];
  updateCategoryIdsFunc?: (ids: string) => void;
  refetchCategoryFunc?: () => void;
};

export const PostCategoryDisplayComponent: FC<Props> = ({
  categories,
  displayActionButton,
  displayCheck,
  checkedCategoryIds = [],
  updateCategoryIdsFunc,
  refetchCategoryFunc,
}) => {
  return (
    <div className="flex flex-col gap-3 max-w-[70%] min-w-[320px]">
      {getRootCategoryList(categories).map((parentCategory) => {
        return (
          <div key={parentCategory.id}>
            <div className="text-xl text-wrap break-all">
              {parentCategory.name}
            </div>
            <div className={`mt-2 ml-2 ${detailTextStyle()}`}>
              {parentCategory.detail}
            </div>
            {displayActionButton && (
              <PostCategoryActionComponent
                category={parentCategory}
                refetchCategoryFunc={refetchCategoryFunc}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
