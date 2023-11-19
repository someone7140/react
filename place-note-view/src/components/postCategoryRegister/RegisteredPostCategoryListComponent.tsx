"use client";

import React, { FC, useState } from "react";

import { Button } from "flowbite-react";
import { Spinner } from "flowbite-react";

import { centerHorizonContainerStyle } from "@/style/CommonStyle";
import { useQuery } from "@tanstack/react-query";
import { getPostCategoryList } from "@/gen/placeNotePostCategoryService-PostCategoryService_connectquery";
import { useRouter } from "next/navigation";
import {
  descriptionMessageStyle,
  errorMessageStyle,
} from "@/style/MessageStyle";
import { PostCategoryListComponent } from "@/components/postCategory/PostCategoryListComponent";
import { DeleteCategoryModalComponent } from "@/components/postCategoryRegister/DeleteCategoryModalComponent";

export const RegisteredPostCategoryListComponent: FC = ({}) => {
  const router = useRouter();
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | undefined>(
    undefined
  );
  const { queryFn, queryKey } = getPostCategoryList.useQuery({});
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn,
    retry: 3,
  });

  const renderButton = (categoryId: string) => {
    return (
      <div className="flex ml-4 gap-2">
        <Button
          color="purple"
          pill
          onClick={() => {
            router.push(`/myCategory/categoryEdit?id=${categoryId}`);
          }}
        >
          <p>編集</p>
        </Button>
        <Button
          color="dark"
          pill
          onClick={() => {
            setDeleteCategoryId(categoryId);
          }}
        >
          <p>削除</p>
        </Button>
      </div>
    );
  };

  return (
    <div className={`${centerHorizonContainerStyle()} mt-2`}>
      <div className="flex flex-col gap-4">
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            <div className={centerHorizonContainerStyle()}>
              <Button
                color="success"
                pill
                onClick={() => {
                  router.push("/myCategory/categoryAdd");
                }}
              >
                <p>新規カテゴリー追加</p>
              </Button>
            </div>
            {data && (
              <>
                {data.categoryList.length > 0 && (
                  <div className="flex content-start">
                    <PostCategoryListComponent
                      categoryList={data.categoryList}
                      renderCategoryAction={renderButton}
                    />
                  </div>
                )}
                {data.categoryList.length === 0 && (
                  <div className={descriptionMessageStyle()}>
                    まだカテゴリーが登録されていません
                  </div>
                )}
                <DeleteCategoryModalComponent
                  categoryId={deleteCategoryId}
                  name={
                    data.categoryList.find((c) => c.id === deleteCategoryId)
                      ?.name
                  }
                  onClose={() => {
                    setDeleteCategoryId(undefined);
                  }}
                  refetch={refetch}
                />
              </>
            )}
            {isError && (
              <div className={errorMessageStyle()}>
                カテゴリーが取得できませんでした
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
