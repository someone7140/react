"use client";

import React, { FC } from "react";

import { PostCategoryResponse } from "@/graphql/gen/graphql";
import { Button } from "@material-tailwind/react";

type Props = {
  category: PostCategoryResponse;
  refetchCategoryFunc?: () => void;
};

export const PostCategoryActionComponent: FC<Props> = ({
  category,
  refetchCategoryFunc,
}) => {
  return (
    <div className="flex gap-10 justify-center mt-2">
      <Button color="orange">編集</Button>
      <Button color="blue-gray">削除</Button>
    </div>
  );
};
