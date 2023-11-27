"use client";

import React, { FC, useEffect } from "react";

import { Spinner } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getPostCategoryById } from "@/gen/placeNotePostCategoryService-PostCategoryService_connectquery";
import { PostCategoryRegisterComponent } from "@/components/postCategoryRegister/PostCategoryRegisterComponent";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";

type Props = {
  categoryId: string;
};

export const PostCategoryUpdateComponent: FC<Props> = ({ categoryId }) => {
  const router = useRouter();
  const { queryFn, queryKey } = getPostCategoryById.useQuery({
    id: categoryId,
  });
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (error) {
      // エラーが発生していたらトップへ
      router.push("/");
    }
  }, [router, error]);

  return (
    <>
      {isLoading && (
        <div className={`${centerHorizonContainerStyle()} mt-2`}>
          <Spinner />
        </div>
      )}
      {!isLoading && data && (
        <div>
          <div className={`${centerHorizonContainerStyle()} mt-2 mb-2`}>
            カテゴリー「{data.name}」の更新
          </div>
          <PostCategoryRegisterComponent registeredPostCategory={data} />
        </div>
      )}
    </>
  );
};
