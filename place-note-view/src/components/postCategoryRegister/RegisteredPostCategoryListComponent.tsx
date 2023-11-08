"use client";

import React, { FC } from "react";

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

export const RegisteredPostCategoryListComponent: FC = ({}) => {
  const router = useRouter();
  const { queryFn, queryKey } = getPostCategoryList.useQuery({});
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn,
    retry: 3,
  });

  return (
    <div className={`${centerHorizonContainerStyle()} mt-2`}>
      <div className="flex flex-col gap-4 items-center">
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            <div>
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
                  <div className="flex flex-col gap-1">
                    {data.categoryList.map((c) => (
                      <div key={c.id}>{c.name}</div>
                    ))}
                  </div>
                )}
                {data.categoryList.length === 0 && (
                  <div className={descriptionMessageStyle()}>
                    まだカテゴリーが登録されていません
                  </div>
                )}
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
