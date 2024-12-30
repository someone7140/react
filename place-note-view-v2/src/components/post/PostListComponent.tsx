"use client";

import React, { FC, useEffect, useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";

import { PostFilterDialogComponent } from "./dialog/PostFilterDialogComponent";
import {
  PostCategoryResponse,
  PostPlaceResponse,
  useGetMyPostCategoriesQuery,
  useGetMyPostsQuery,
  useGetPostPlacesAndCategoriesQuery,
} from "@/graphql/gen/graphql";
import { PostListDisplayComponent } from "./list/PostListDisplayComponent";

export type PostListFilter = {
  category?: PostCategoryResponse;
  place?: PostPlaceResponse;
};

export const PostListComponent: FC = ({}) => {
  const [allPostLength, setAllPostLength] = useState<number | undefined>(
    undefined
  );
  const [postFilter, setPostFilter] = useState<PostListFilter | undefined>(
    undefined
  );
  const [placeNameFilter, setPlaceNameFilter] = useState<string>("");
  const [isOpenFilterDialog, setIsOpenFilterDialog] = useState<boolean>(false);

  const { data, loading, refetch } = useGetMyPostsQuery({
    variables: {
      idFilter: null,
      placeIdFilter: postFilter?.place?.id ?? null,
      categoryIdsFilter: postFilter?.category?.id
        ? [postFilter?.category?.id]
        : null,
    },
    fetchPolicy: "network-only",
  });
  const { data: placeAndCategories, refetch: refetchPlaceAndCategories } =
    useGetPostPlacesAndCategoriesQuery({
      variables: { idFilter: null, nameFilter: null, categoryFilter: null },
      fetchPolicy: "network-only",
    });

  const onClickPlaceFilter = () => {
    refetchPlaceAndCategories({
      nameFilter: placeNameFilter ? placeNameFilter : null,
    });
  };

  useEffect(() => {
    if (data && allPostLength == null) {
      setAllPostLength(data.getMyPosts.length);
    }
  }, [data, allPostLength]);

  if (loading || allPostLength == null) {
    return <Spinner />;
  }

  const postList = data?.getMyPosts ?? [];

  return (
    <>
      {allPostLength != null && (
        <>
          {allPostLength === 0 && <>投稿が未登録です</>}
          {allPostLength > 0 && (
            <div className="max-w-[90%] min-w-[320px]">
              <div className="mb-3">
                <div className="flex flex-row gap-3">
                  <Button
                    variant="filled"
                    className="w-[120px]"
                    onClick={() => {
                      setIsOpenFilterDialog(true);
                    }}
                    color="light-blue"
                  >
                    絞り込み
                  </Button>
                  {postFilter && (
                    <Button
                      variant="filled"
                      className="w-[120px]"
                      onClick={() => {
                        setPostFilter(undefined);
                      }}
                      color="blue-gray"
                    >
                      クリア
                    </Button>
                  )}
                  <PostFilterDialogComponent
                    isOpen={isOpenFilterDialog}
                    closeDialog={() => {
                      setIsOpenFilterDialog(false);
                    }}
                    postFilter={postFilter}
                    setPostFilter={setPostFilter}
                    categoryAndPlaceData={placeAndCategories}
                    placeNameFilter={placeNameFilter}
                    setPlaceNameFilter={setPlaceNameFilter}
                    onClickPlaceFilter={onClickPlaceFilter}
                  />
                </div>
                {postFilter?.place && (
                  <div className="mt-2">
                    場所「{postFilter?.place?.name}」で絞り込み
                  </div>
                )}
                {postFilter?.category && (
                  <div className="mt-2">
                    カテゴリー「{postFilter?.category?.name}」で絞り込み
                  </div>
                )}
              </div>
              {postList.length === 0 && (
                <div className="mt-4">指定した条件の投稿はありません</div>
              )}
              {postList.length > 0 && (
                <PostListDisplayComponent
                  postList={postList}
                  categoryList={placeAndCategories?.getMyPostCategories ?? []}
                  refetch={refetch}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
