"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { POST_CATEGORY_LIST_PAGE_PATH } from "@/components/menu/constants/MenuPathConstants";
import {
  PostCategoryInputComponent,
  PostCategoryInputFormType,
} from "@/components/postCategory/input/PostCategoryInputComponent";
import { useAddPostCategoryMutation } from "@/graphql/gen/graphql";

export const PostCategoryRegisterComponent: FC = () => {
  const [addCategory, { loading: addCategoryLoading }] =
    useAddPostCategoryMutation();
  const router = useRouter();

  const execSubmit = async (formData: PostCategoryInputFormType) => {
    const result = await addCategory({
      variables: {
        name: formData.name,
        parentCategoryId: formData.parentCategoryId
          ? formData.parentCategoryId
          : null,
        displayOrder:
          formData.displayOrder != null ? formData.displayOrder : null,
        detail: formData.detail ?? null,
      },
    });

    const addPostCategoryResult = result.data?.addPostCategory;
    if (result.errors || !addPostCategoryResult) {
      toast.error("登録に失敗しました");
    } else {
      toast("カテゴリーを登録しました");
      router.push(POST_CATEGORY_LIST_PAGE_PATH);
    }
  };

  return (
    <PostCategoryInputComponent
      execSubmit={execSubmit}
      disabledFlag={addCategoryLoading}
    />
  );
};
