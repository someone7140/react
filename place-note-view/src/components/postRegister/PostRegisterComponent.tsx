"use client";

import React, { FC, useEffect } from "react";

import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { getPostPlaceById } from "@/gen/placeNotePostPlaceService-PostPlaceService_connectquery";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";

export type Props = {
  placeId: string;
};

export const PostRegisterComponent: FC<Props> = ({ placeId }) => {
  const router = useRouter();

  const { queryFn: postPlaceQueryFn, queryKey: postPlaceQueryKey } =
    getPostPlaceById.useQuery({
      id: placeId,
    });
  const { data, isLoading, isError } = useQuery({
    queryKey: postPlaceQueryKey,
    queryFn: postPlaceQueryFn,
    retry: 0,
  });

  useEffect(() => {
    if (isError) {
      // エラーの時は選択画面へ遷移
      router.push("/myPostAdd");
    }
  }, [isError, router]);

  return (
    <>
      {isLoading && (
        <div className={`${centerHorizonContainerStyle()} mt-2`}>
          <Spinner />
        </div>
      )}
      {!isLoading && data && (
        <div className={centerHorizonContainerStyle()}>
          「{data.name}」で投稿する
        </div>
      )}
    </>
  );
};
