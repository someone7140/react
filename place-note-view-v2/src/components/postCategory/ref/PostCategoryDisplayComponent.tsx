"use client";

import React, { FC } from "react";

import { PostCategoryResponse } from "@/graphql/gen/graphql";
import { getChildrenCategory, getRootCategoryList } from "@/utils/postUtil";
import { PostCategoryItemComponent } from "./PostCategoryItemComponent";

type Props = {
  categories: PostCategoryResponse[];
  displayActionButton?: boolean;
  displaySelectButton?: boolean;
  displayCheck?: boolean;
  checkedCategoryIds?: string[];
  updateCategoryIdsFunc?: (id: string) => void;
  refetchCategoryFunc?: () => void;
};

export const PostCategoryDisplayComponent: FC<Props> = ({
  categories,
  displayActionButton,
  displaySelectButton,
  displayCheck,
  checkedCategoryIds = [],
  updateCategoryIdsFunc,
  refetchCategoryFunc,
}) => {
  return (
    <div className="flex flex-col gap-3 w-[100%]">
      {getRootCategoryList(categories).map((parentCategory) => {
        return (
          <div key={parentCategory.id}>
            <PostCategoryItemComponent
              {...{
                category: parentCategory,
                displayActionButton,
                displaySelectButton,
                displayCheck,
                checkedCategoryIds,
                updateCategoryIdsFunc,
                refetchCategoryFunc,
              }}
            />
            <div className="ml-4 flex flex-col gap-2 mt-2">
              {getChildrenCategory(categories, parentCategory.id).map(
                (childCategory) => {
                  return (
                    <PostCategoryItemComponent
                      key={childCategory.id}
                      {...{
                        category: childCategory,
                        displayActionButton,
                        displaySelectButton,
                        displayCheck,
                        checkedCategoryIds,
                        updateCategoryIdsFunc,
                        refetchCategoryFunc,
                      }}
                    />
                  );
                }
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
