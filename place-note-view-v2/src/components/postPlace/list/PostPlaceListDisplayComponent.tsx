"use client";

import React, { FC } from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";

import { MapModalByLatLonComponent } from "@/components/map/MapModalByLatLonComponent";
import { PostPlaceActionComponent } from "@/components/postPlace/PostPlaceActionComponent";
import { PostCategoryResponse, PostPlaceResponse } from "@/graphql/gen/graphql";
import { inputTextStyle } from "@/style/FormStyle";
import { detailTextStyle } from "@/style/PostStyle";
import { linkStyle } from "@/style/CommonStyle";

type Props = {
  placeList: PostPlaceResponse[];
  categoryList: PostCategoryResponse[];
  nameFilter?: string;
  setNameFilter: (name: string) => void;
  onClickFilter: () => void;
  selectActionForPost?: (place: PostPlaceResponse) => void;
  placeSelectAction?: (place: PostPlaceResponse) => void;
  refetch?: () => void;
};

export const PostPlaceListDisplayComponent: FC<Props> = ({
  placeList,
  categoryList,
  nameFilter,
  setNameFilter,
  onClickFilter,
  selectActionForPost,
  placeSelectAction,
  refetch,
}) => {
  return (
    <>
      <div className="flex flex-row flex-wrap gap-2 mb-3">
        <div className="w-[200px]">
          <Input
            value={nameFilter}
            className={`${inputTextStyle({ type: "short" })}`}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="検索したい場所名"
          />
        </div>
        <Button
          className="w-[80px] !px-2"
          onPress={onClickFilter}
          color="success"
        >
          絞り込み
        </Button>
      </div>
      {placeList.length === 0 && <>指定した条件の場所はありません</>}
      {placeList.length > 0 && (
        <div className="flex flex-col gap-5 max-h-[72vh] overflow-auto">
          {placeList.map((place) => {
            return (
              <div key={place.id} className="min-w-[210px] max-w-[320px]">
                {place.url && (
                  <Link
                    href={place.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={`text-wrap break-all text-xl ${linkStyle()}`}
                  >
                    {place.name}
                  </Link>
                )}
                {!place.url && (
                  <span className="text-wrap break-all text-black text-xl">
                    {place.name}
                  </span>
                )}
                <div className="ml-2 mt-1">
                  <div className={`${detailTextStyle()}`}>{place.detail}</div>
                  <div className="flex gap-2 items-center">
                    <div className="text-wrap break-all max-w-[90%]">
                      {place?.address}
                    </div>
                    {place?.latLon && (
                      <MapModalByLatLonComponent latLon={place.latLon} />
                    )}
                  </div>
                  <div className="text-wrap break-all text-noix">
                    {place.categoryIdList
                      .map((id) => categoryList.find((c) => c.id === id)?.name)
                      .join("、")}
                  </div>
                </div>
                {selectActionForPost && (
                  <div className="mt-4">
                    <PostPlaceActionComponent
                      place={place}
                      refetchPlaceFunc={refetch}
                      selectActionForPost={(postPlace: PostPlaceResponse) => {
                        selectActionForPost?.(postPlace);
                      }}
                    />
                  </div>
                )}
                {placeSelectAction && (
                  <div className="mt-4 flex w-[100%] justify-center">
                    <Button
                      color="warning"
                      onPress={() => {
                        placeSelectAction(place);
                      }}
                    >
                      選択
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
