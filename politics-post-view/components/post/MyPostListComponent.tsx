"use client";

import { FC } from "react";
import { useQuery } from "@apollo/client/react";
import { Spinner } from "@heroui/react";
import { useInfiniteScroll } from "ahooks";

import { PostRefComponent } from "./ref/PostRefComponent";
import {
  GetMyPostsDocument,
  PostResponseFragment,
} from "@/graphql/gen/graphql";

interface DisplayPostListData {
  list: PostResponseFragment[];
  total: number;
}

export const MyPostListComponent: FC = () => {
  const { data, loading, refetch } = useQuery(GetMyPostsDocument, {
    fetchPolicy: "network-only",
  });
  const dataGetList = data?.getMyPosts ?? [];
  const { data: displayPost } = useInfiniteScroll<DisplayPostListData>(
    (d) => getLoadMoreList(d?.list.length ?? 0, 10),
    {
      target: () => document,
      isNoMore: (d) => (d ? d.list.length >= dataGetList.length : false),
      reloadDeps: [data?.getMyPosts],
    },
  );

  const getLoadMoreList = (
    start: number,
    limit: number,
  ): Promise<DisplayPostListData> => {
    let end = start + limit;
    if (end > dataGetList.length) {
      end = dataGetList.length;
    }

    const list = dataGetList.slice(start, end);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list,
          total: dataGetList.length,
        });
      }, 100);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <>
      {data && dataGetList.length === 0 && <>投稿はありません</>}
      {displayPost && displayPost.total > 0 && (
        <div className="flex flex-col gap-2">
          {displayPost.list.map((post) => (
            <PostRefComponent
              key={post.id}
              post={post}
              isMyPostScreen={true}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </>
  );
};
