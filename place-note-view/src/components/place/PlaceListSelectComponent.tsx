"use client";

import React, { FC, ReactNode, useState } from "react";

import { Button, Spinner } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";

import { PlaceListComponent } from "@/components/place/PlaceListComponent";
import { PostCategoryListComponent } from "@/components/postCategory/PostCategoryListComponent";
import { getPostCategoryList } from "@/gen/placeNotePostCategoryService-PostCategoryService_connectquery";
import { PostCategoryResponse } from "@/gen/placeNotePostCategoryService_pb";
import { PostPlaceResponse } from "@/gen/placeNotePostPlaceService_pb";
import { getPostPlaceList } from "@/gen/placeNotePostPlaceService-PostPlaceService_connectquery";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";

export type Props = {
  placeActionRender: (
    place: PostPlaceResponse,
    refetch?: () => {}
  ) => ReactNode;
};

export const PlaceListSelectComponent: FC<Props> = ({ placeActionRender }) => {
  const { queryFn: categoryQueryFn, queryKey: categoryQueryKey } =
    getPostCategoryList.useQuery({});
  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: categoryQueryKey,
    queryFn: categoryQueryFn,
    retry: 3,
  });
  const { queryFn: placeQueryFn, queryKey: placeQueryKey } =
    getPostPlaceList.useQuery({});
  const {
    data: placeData,
    isLoading: placeLoading,
    refetch: placeRefetch,
  } = useQuery({
    queryKey: placeQueryKey,
    queryFn: placeQueryFn,
    retry: 3,
  });

  const [showPlaces, setShowPlaces] = useState<PostPlaceResponse[]>([]);
  const [selectCategory, setSelectCategory] = useState<
    PostCategoryResponse | undefined
  >(undefined);

  const renderPlaceButton = (categoryId: string) => {
    const category = categoryData?.categoryList.find(
      (c) => c.id === categoryId
    );
    // 子カテゴリーが設定されている場合は親にも含める
    const targetPlaceList =
      placeData?.placeList.filter((p) =>
        p.categoryIdList.some(
          (cId) => cId === category?.id || cId === category?.parentId
        )
      ) ?? [];

    return (
      <>
        {targetPlaceList.length > 0 && (
          <div className="flex ml-4 gap-2">
            <Button
              color="purple"
              pill
              onClick={() => {
                setShowPlaces(targetPlaceList);
                setSelectCategory(category);
              }}
            >
              <p>場所一覧を表示</p>
            </Button>
          </div>
        )}
      </>
    );
  };

  const noCategoryPlaceList =
    placeData?.placeList.filter((p) => p.categoryIdList.length === 0) ?? [];

  return (
    <div className={`${centerHorizonContainerStyle()} mt-2`}>
      {(categoryLoading || placeLoading) && <Spinner />}
      {categoryData && placeData && (
        <>
          {showPlaces.length === 0 && (
            <>
              <PostCategoryListComponent
                categoryList={categoryData.categoryList}
                renderCategoryAction={renderPlaceButton}
              />
              {noCategoryPlaceList.length > 0 && (
                <>
                  <div className="flex ml-4 gap-2">
                    <Button
                      color="purple"
                      pill
                      onClick={() => {
                        setShowPlaces(noCategoryPlaceList);
                      }}
                    >
                      <p>カテゴリー未指定の場所一覧を表示</p>
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
          {showPlaces.length > 0 && (
            <div className="flex flex-col gap-4">
              <Button
                color="success"
                pill
                onClick={() => {
                  setShowPlaces([]);
                  setSelectCategory(undefined);
                }}
              >
                <p>カテゴリー選択に戻る</p>
              </Button>
              {selectCategory && <div>「{selectCategory.name}」の場所一覧</div>}
              <PlaceListComponent
                places={showPlaces}
                placeActionRender={placeActionRender}
                refetch={placeRefetch}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
