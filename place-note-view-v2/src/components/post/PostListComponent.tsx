"use client";

import React, { FC, useEffect, useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";

import { PostFilterDialogComponent } from "./dialog/PostFilterDialogComponent";
import {
  PostCategoryResponse,
  PostPlaceResponse,
  useGetMyPostsQuery,
  useGetPostPlacesAndCategoriesQuery,
} from "@/graphql/gen/graphql";
import { PostListDisplayComponent } from "./list/PostListDisplayComponent";
import { orderButtonStyle } from "@/style/PostStyle";

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
  const [isOrderPostDate, setIsOrderPostDate] = useState<boolean>(false);
  const [placeNameFilter, setPlaceNameFilter] = useState<string>("");
  const [isOpenFilterDialog, setIsOpenFilterDialog] = useState<boolean>(false);

  const { data, loading, refetch } = useGetMyPostsQuery({
    variables: {
      idFilter: null,
      placeIdFilter: postFilter?.place?.id ?? null,
      categoryIdsFilter: postFilter?.category?.id
        ? [postFilter?.category?.id]
        : null,
      isOrderPostDate: isOrderPostDate,
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

  useEffect(() => {
    setAllPostLength(undefined);
  }, [postFilter, isOrderPostDate]);

  const refetchPost = () => {
    setPostFilter(undefined);
    refetch();
  };

  const switchOrderPostDate = (isOrderPostDateInput: boolean) => {
    setIsOrderPostDate(isOrderPostDateInput);
  };

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
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-3">
                      <Button
                        variant="filled"
                        className="w-[80px] pl-1 pr-1"
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
                          className="w-[70px] pl-1 pr-1"
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
                      <div className="mt-2 text-xs">
                        場所「{postFilter?.place?.name}」で絞り込み
                      </div>
                    )}
                    {postFilter?.category && (
                      <div className="mt-2 text-xs">
                        カテゴリー「{postFilter?.category?.name}」で絞り込み
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row mt-1 items-center">
                    <div
                      className={`${orderButtonStyle({
                        type: isOrderPostDate ? "notSelected" : "selected",
                      })} w-[70px]`}
                      onClick={() => {
                        switchOrderPostDate(false);
                      }}
                    >
                      訪問日順
                    </div>
                    <div
                      className={`${orderButtonStyle({
                        type: isOrderPostDate ? "selected" : "notSelected",
                      })} w-[70px]`}
                      onClick={() => {
                        switchOrderPostDate(true);
                      }}
                    >
                      投稿日順
                    </div>
                  </div>
                </div>
              </div>
              {postList.length === 0 && (
                <div className="mt-4">指定した条件の投稿はありません</div>
              )}
              {postList.length > 0 && (
                <div className="flex justify-center">
                  <PostListDisplayComponent
                    postList={postList}
                    categoryList={placeAndCategories?.getMyPostCategories ?? []}
                    refetch={refetchPost}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
