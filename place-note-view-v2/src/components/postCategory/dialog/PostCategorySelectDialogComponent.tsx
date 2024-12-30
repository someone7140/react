"use client";

import React, { FC } from "react";
import { Button, Dialog } from "@material-tailwind/react";

import { PostCategoryDisplayComponent } from "@/components/postCategory/ref/PostCategoryDisplayComponent";
import { PostCategoryResponse } from "@/graphql/gen/graphql";
import { dialogBoxStyle } from "@/style/CommonStyle";

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  categories: PostCategoryResponse[];
  updateCategoryIdsFunc?: (id: string) => void;
  selectedIds: string[];
};

export const PostCategorySelectDialogComponent: FC<Props> = ({
  isOpen,
  closeDialog,
  categories,
  updateCategoryIdsFunc,
  selectedIds,
}) => {
  return (
    <Dialog open={isOpen} handler={closeDialog}>
      <div className={`${dialogBoxStyle({ type: "scroll" })} max-h-[75vh]`}>
        <div className="flex justify-start mb-3 w-[99%]">
          <PostCategoryDisplayComponent
            categories={categories}
            updateCategoryIdsFunc={updateCategoryIdsFunc}
            displayCheck
            checkedCategoryIds={selectedIds}
          />
        </div>
      </div>
      <div className="flex justify-center mt-3 mb-3">
        <Button color="blue-gray" onClick={closeDialog}>
          閉じる
        </Button>
      </div>
    </Dialog>
  );
};
