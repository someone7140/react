"use client";

import { FC } from "react";

import { useQuery } from "@apollo/client/react";
import { Spinner } from "@heroui/react";

import { PostRefComponent } from "./ref/PostRefComponent";
import { GetMyPostsDocument } from "@/graphql/gen/graphql";

export const MyPostListComponent: FC = () => {
  const { data, loading, refetch } = useQuery(GetMyPostsDocument, {
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <>
      {!data?.getMyPosts ||
        (data.getMyPosts?.length === 0 && <>投稿はありません</>)}
      {data?.getMyPosts && data.getMyPosts.length > 0 && (
        <div className="flex flex-col gap-2">
          {data.getMyPosts.map((post) => (
            <PostRefComponent key={post.id} post={post} isMyPostScreen={true} />
          ))}
        </div>
      )}
    </>
  );
};
