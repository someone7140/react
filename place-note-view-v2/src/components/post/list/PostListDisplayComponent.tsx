"use client";

import React, { FC, useRef, useState } from "react";
import { useInfiniteScroll } from "ahooks";
import { Data } from "ahooks/lib/useInfiniteScroll/types";

import { MyPostRefComponent } from "../ref/MyPostRefComponent";
import { OpenPostRefComponent } from "../ref/OpenPostRefComponent";
import { PostCategoryResponse, PostResponse } from "@/graphql/gen/graphql";
import { postListStyle } from "@/style/PostStyle";

export type Props = {
  postList: PostResponse[];
  categoryList: PostCategoryResponse[];
  refetch?: () => void;
  isOpenOnly?: boolean;
  isDisplayUserInfo?: boolean;
};

export const PostListDisplayComponent: FC<Props> = ({
  postList,
  categoryList,
  refetch,
  isOpenOnly,
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
      className={postListStyle({ type: isOpenOnly ? "open" : "myPost" })}
      ref={listRef}
    >
      {displayPost?.list.map((post: PostResponse) => {
        return (
          <React.Fragment key={post.id}>
            {isOpenOnly ? (
              <OpenPostRefComponent post={post} />
            ) : (
              <MyPostRefComponent
                post={post}
                categoryData={categoryList}
                refetchData={refetch}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
