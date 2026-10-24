"use client";

import { FC, useRef, useState } from "react";

import { useQuery } from "@apollo/client/react";
import { Spinner } from "@heroui/react";
import { useInfiniteScroll } from "ahooks";
import { Data } from "ahooks/lib/usePagination/types";

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
  const [displayLength, setDisplayLength] = useState<number>(0);
  const { data, loading } = useQuery(GetMyPostsDocument, {
    fetchPolicy: "network-only",
  });
  const dataGetList = !data?.getMyPosts ? [] : data.getMyPosts;
  const listRef = useRef<HTMLDivElement>(null);
  const { data: displayPost } = useInfiniteScroll<DisplayPostListData>(
    (d) => getLoadMoreList(10),
    {
      target: listRef,
      isNoMore: (d) => {
        return dataGetList.length <= displayLength;
      },
    },
  );

  const getLoadMoreList = (limit: number): Promise<Data> => {
    const start = displayLength;
    let end = start + limit;
    if (end > dataGetList.length) {
      end = dataGetList.length;
    }
    setDisplayLength(end);

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
      {!data?.getMyPosts ||
        (data.getMyPosts?.length === 0 && <>投稿はありません</>)}
      {displayPost && displayPost.total > 0 && (
        <div className="flex flex-col gap-2" ref={listRef}>
          {displayPost.list.map((post) => (
            <PostRefComponent key={post.id} post={post} isMyPostScreen={true} />
          ))}
        </div>
      )}
    </>
  );
};
