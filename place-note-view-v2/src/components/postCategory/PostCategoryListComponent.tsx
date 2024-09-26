"use client";

import React, { FC } from "react";
import { Spinner } from "@material-tailwind/react";

import { PostCategoryDisplayComponent } from "@/components/postCategory/ref/PostCategoryDisplayComponent";
import { useGetMyPostCategoriesQuery } from "@/graphql/gen/graphql";

export const PostCategoryListComponent: FC = () => {
  const { data, loading, error, refetch } = useGetMyPostCategoriesQuery({
    variables: { nameFilter: null },
    fetchPolicy: "network-only",
  });
  const categories = data?.getMyPostCategories;

  if (loading) {
    return <Spinner />;
  }
  if (error || !categories) {
    return <>カテゴリー取得時にエラーが発生しました</>;
  }
  if (categories.length === 0) {
    return <>カテゴリーが未登録です</>;
  }

  return (
    <PostCategoryDisplayComponent
      categories={categories}
      displayActionButton
      refetchCategoryFunc={refetch}
    />
  );
};
