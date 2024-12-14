"use client";

import React, { FC } from "react";

import { PostCategoryResponse, PostResponse } from "@/graphql/gen/graphql";

type Props = {
  post: PostResponse;
  categoryData?: PostCategoryResponse[];
};

export const PostRefComponent: FC<Props> = ({ post, categoryData }) => {
  console.log(post);
  return (
    <div className="min-w-[300px] border p-1">
      <div className={"text-wrap break-all text-black text-2xl"}>
        {post.title}
      </div>
      <div className={"flex gap-2"}>
        <div>場所:</div>
        <div>{post.postPlace.name}</div>
      </div>
      <div className={"flex gap-2"}>
        <div>訪問日:</div>
        <div>
          {new Date(post.visitedDateStr).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};
