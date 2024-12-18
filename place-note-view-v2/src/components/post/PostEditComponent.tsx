"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

import { POST_LIST_PAGE_PATH } from "@/components/menu/constants/MenuPathConstants";
import {
  PostInputComponent,
  PostInputFormType,
} from "@/components/post/input/PostInputComponent";
import {
  useEditPostMutation,
  useGetMyPostCategoriesQuery,
  useGetMyPostsQuery,
  useGetPostPlacesAndCategoriesQuery,
} from "@/graphql/gen/graphql";
import { pageTitleStyle } from "@/style/CommonStyle";

type Props = {
  id: string;
  placeId?: string;
};

export const PostEditComponent: FC<Props> = ({ id, placeId }) => {
  const router = useRouter();
  const [editPost, { loading: editPostLoading }] = useEditPostMutation();

  const { data: postData, loading: postLoading } = useGetMyPostsQuery({
    variables: { idFilter: id, placeIdFilter: null, categoryIdsFilter: null },
    fetchPolicy: "network-only",
  });

  const {
    data: placeAndCategoriesData,
    loading: placeAndCategoriesDataLoading,
  } = useGetPostPlacesAndCategoriesQuery({
    variables: { idFilter: placeId, nameFilter: null, categoryFilter: null },
    fetchPolicy: "network-only",
    skip: !placeId,
  });

  const { data: categoriesData, loading: categoriesDataLoading } =
    useGetMyPostCategoriesQuery({
      variables: { nameFilter: null },
      fetchPolicy: "network-only",
      skip: !!placeId,
    });

  const editPostData = postData?.getMyPosts[0];
  const editPlaceId = placeId ? placeId : editPostData?.postPlace.id;
  const editPlaceName = placeId
    ? placeAndCategoriesData?.getPostPlaces[0].name
    : editPostData?.postPlace.name;
  const categories = placeId
    ? placeAndCategoriesData?.getMyPostCategories
    : categoriesData?.getMyPostCategories;

  const execSubmit = async (formData: PostInputFormType) => {
    const result = await editPost({
      variables: {
        id: id,
        title: formData.title,
        visitedDate: formData.visitedDate,
        placeId: editPlaceId ? editPlaceId : "",
        categoryIdList: formData.categoryIdList,
        isOpen: formData.isOpen,
        detail: formData.detail ?? null,
        urlList: formData.urlList.filter((url) => !!url),
      },
    });

    const editPostResult = result.data?.editPost;
    if (result.errors || !editPostResult) {
      toast.error("編集に失敗しました");
    } else {
      toast("投稿を編集しました");
      router.push(POST_LIST_PAGE_PATH);
    }
  };

  if (postLoading || placeAndCategoriesDataLoading || categoriesDataLoading) {
    return <Spinner />;
  }

  return (
    <>
      {editPostData && categories && (
        <>
          <div className={pageTitleStyle()}>
            「{editPlaceName}」の投稿を編集
          </div>
          <PostInputComponent
            execSubmit={execSubmit}
            postCategories={{
              selectCategoriesDefault: editPostData.categoryIdList,
              categories: categories,
            }}
            editPostData={editPostData}
            disabledFlag={editPostLoading}
          />
        </>
      )}
    </>
  );
};
