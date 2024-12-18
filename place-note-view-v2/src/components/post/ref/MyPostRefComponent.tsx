"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

import { PostDeleteDialogComponent } from "../dialog/PostDeleteDialogComponent";
import { POST_EDIT_PAGE_PATH } from "@/components/menu/constants/MenuPathConstants";
import { PostCategoryResponse, PostResponse } from "@/graphql/gen/graphql";
import { detailTextStyle } from "@/style/PostStyle";

type Props = {
  post: PostResponse;
  categoryData?: PostCategoryResponse[];
  refetchData: () => void;
};

export const MyPostRefComponent: FC<Props> = ({
  post,
  categoryData,
  refetchData,
}) => {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  return (
    <div className="min-w-[300px] border p-3">
      <div className={"text-wrap break-all text-black text-2xl"}>
        {post.title}
      </div>
      <div className={"flex gap-2"}>
        <div>場所:</div>
        {!post.postPlace.url && <div>{post.postPlace.name}</div>}
        {post.postPlace.url && (
          <div>
            <Link
              href={post.postPlace.url}
              rel="noopener noreferrer"
              target="_blank"
              className="underline text-blue-600 hover:text-blue-800"
            >
              {post.postPlace.name}
            </Link>
          </div>
        )}
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
      <div className={"flex gap-2"}>
        <div>公開設定:</div>
        <div>{post.isOpen ? "公開" : "非公開"}</div>
      </div>
      <div className={"flex gap-2"}>
        <div>カテゴリー:</div>
        <div>
          {post.categoryIdList
            .flatMap((id) => {
              const name = categoryData?.find(
                (category) => category.id === id
              )?.name;
              return name ?? [];
            })
            .join("、")}
        </div>
      </div>
      <div className={`${detailTextStyle()}`}>{post.detail}</div>
      <div className={"flex gap-3 mt-2 justify-center"}>
        <Button
          color="orange"
          onClick={() => {
            router.push(`${POST_EDIT_PAGE_PATH}?id=${post.id}`);
          }}
        >
          編集
        </Button>
        <Button
          color="blue-gray"
          onClick={() => {
            setIsDeleteOpen(true);
          }}
        >
          削除
        </Button>
      </div>
      <PostDeleteDialogComponent
        isOpen={isDeleteOpen}
        closeDialog={() => {
          setIsDeleteOpen(false);
        }}
        post={post}
        refetchPostFunc={refetchData}
      />
    </div>
  );
};
