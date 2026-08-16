"use client";

import { FC } from "react";

import { GetMyPostsQuery } from "@/graphql/gen/graphql";
import { POST_STATUSES } from "@/constants/PostConstants";

type Props = {
  post: NonNullable<GetMyPostsQuery["getMyPosts"]>[number];
  isMyPostScreen: boolean;
};

export const PostRefComponent: FC<Props> = ({ post, isMyPostScreen }) => {
  return (
    <div className="min-w-[300px] border border-gray-300 p-3">
      <div className={"text-wrap break-all text-black text-2xl"}>
        {post.title}
      </div>
      {isMyPostScreen && (
        <>
          <div className={"flex gap-2"}>
            <div>ステータス:</div>
            <div>{POST_STATUSES.find((p) => p.key === post.status)?.label}</div>
          </div>
          <div className={"flex gap-2"}>
            <div>最終更新日:</div>
            <div>
              {new Date(post.updateAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
