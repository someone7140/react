"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

import { POST_CATEGORY_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import { PostCategoryInputComponent } from "@/components/postCategory/input/PostCategoryInputComponent";
import { PostCategoryInputFormType } from "@/hooks/inputSessionStore/usePostCategoryInputSessionStore";
import {
  useEditPostCategoryMutation,
  useGetMyPostCategoryByIdQuery,
} from "@/graphql/gen/graphql";

type Props = {
  id: string;
};

export const PostCategoryEditComponent: FC<Props> = ({ id }) => {
  const [editCategory, { loading: editCategoryLoading }] =
    useEditPostCategoryMutation();
  const { data: registeredCategoryData, loading: registeredCategoryLoading } =
    useGetMyPostCategoryByIdQuery({
      variables: { idFilter: id },
      fetchPolicy: "network-only",
    });
  const router = useRouter();

  const execSubmit = async (formData: PostCategoryInputFormType) => {
    const result = await editCategory({
      variables: {
        id: id,
        name: formData.name,
        parentCategoryId: formData.parentCategoryId
          ? formData.parentCategoryId
          : null,
        displayOrder:
          formData.displayOrder != null && String(formData.displayOrder) != ""
            ? formData.displayOrder
            : null,
        detail: formData.detail ?? null,
      },
    });

    const editPostCategoryResult = result.data?.editPostCategory;
    if (result.errors || !editPostCategoryResult) {
      toast.error("更新に失敗しました");
    } else {
      toast("カテゴリーを更新しました");
      router.push(POST_CATEGORY_LIST_PAGE_PATH);
    }
  };

  if (registeredCategoryLoading) {
    return <Spinner />;
  }

  return (
    <>
      {registeredCategoryData?.getMyPostCategoryById && (
        <PostCategoryInputComponent
          execSubmit={execSubmit}
          disabledFlag={editCategoryLoading}
          registeredCategory={registeredCategoryData.getMyPostCategoryById}
        />
      )}
    </>
  );
};
