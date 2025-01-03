"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { useAsyncEffect, useInfiniteScroll } from "ahooks";
import { Data } from "ahooks/lib/useInfiniteScroll/types";

import { MyPostRefComponent } from "@/components/post/ref/MyPostRefComponent";
import { PostCategoryResponse, PostResponse } from "@/graphql/gen/graphql";

export type Props = {
  postList: PostResponse[];
  categoryList: PostCategoryResponse[];
  refetch: () => void;
};

export const PostListDisplayComponent: FC<Props> = ({
  postList,
  categoryList,
  refetch,
}) => {
  const [displayLength, setDisplayLength] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { data: displayPost } = useInfiniteScroll((d) => getLoadMoreList(5), {
    target: listRef,
    isNoMore: (d) => {
      return postList.length <= displayLength;
    },
  });

  const getLoadMoreList = (limit: number): Promise<Data> => {
    const start = displayLength;
    let end = start + limit;
    if (end > postList.length) {
      end = postList.length;
    }
    setDisplayLength(end);

    const list = postList.slice(start, end);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list,
        });
      }, 100);
    });
  };

  return (
    <div
      className="flex flex-col gap-5 max-w-[340px] max-h-[69vh] overflow-auto"
      ref={listRef}
    >
      {displayPost?.list.map((post: PostResponse) => {
        return (
          <MyPostRefComponent
            key={post.id}
            post={post}
            categoryData={categoryList}
            refetchData={refetch}
          />
        );
      })}
    </div>
  );
};
