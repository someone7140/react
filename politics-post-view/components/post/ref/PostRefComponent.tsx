"use client";

import { FC, useState } from "react";
import { Button, toast } from "@heroui/react";
import { useRouter } from "next/navigation";

import { POST_STATUSES } from "@/constants/PostConstants";
import { POST_EDIT_PAGE_PATH } from "@/constants/MenuPathConstants";
import { DeletePostDocument, GetMyPostsQuery } from "@/graphql/gen/graphql";
import { useMutation } from "@apollo/client/react";
import { PostDeleteConfirmModalComponent } from "../modal/PostDeleteConfirmModalComponent";

type Props = {
  post: NonNullable<GetMyPostsQuery["getMyPosts"]>[number];
  isMyPostScreen: boolean;
  refetch: () => void;
};

export const PostRefComponent: FC<Props> = ({
  post,
  isMyPostScreen,
  refetch,
}) => {
  const router = useRouter();
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [deletePost, { loading: deletePostLoading }] =
    useMutation(DeletePostDocument);

  const onClickDelete = async () => {
    try {
      const result = await deletePost({
        variables: {
          id: post.id,
        },
      });

      if (result.error || !result.data?.deletePost) {
        toast.danger("削除時にエラーが発生しました。");
        return;
      }

      toast.success("削除しました。");
      refetch();
    } catch {
      toast.danger("削除時にエラーが発生しました。");
    }
  };

  return (
    <div className="min-w-[300px] border border-gray-300 p-3">
      <div className={"text-wrap break-all text-black text-2xl"}>
        {post.title}
      </div>
      {post.tags.length > 0 && (
        <div className="flex gap-2">
          <div>タグ:</div>
          <div>{post.tags.map((tag) => tag.tagName).join("、")}</div>
        </div>
      )}
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
          {post.status === "DRAFT" && (
            <div className={"flex gap-2 justify-center mt-2"}>
              <Button
                size="sm"
                className="text-xs bg-orange-600"
                onClick={() => {
                  router.push(`${POST_EDIT_PAGE_PATH}?postId=${post.id}`);
                }}
              >
                編集
              </Button>
              <Button
                size="sm"
                className="text-xs bg-gray-700"
                isPending={deletePostLoading}
                onClick={() => setIsDeleteConfirmModalOpen(true)}
              >
                削除
              </Button>
            </div>
          )}
          {post.status === "DRAFT" && (
            <PostDeleteConfirmModalComponent
              isOpen={isDeleteConfirmModalOpen}
              setIsOpen={setIsDeleteConfirmModalOpen}
              submitExec={onClickDelete}
            />
          )}
        </>
      )}
    </div>
  );
};
