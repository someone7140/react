"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input, Spinner } from "@material-tailwind/react";

import { PostPlaceActionComponent } from "@/components/postPlace/PostPlaceActionComponent";
import { useGetPostPlacesAndCategoriesQuery } from "@/graphql/gen/graphql";
import { inputTextLabelStyle, inputTextStyle } from "@/style/FormStyle";
import { detailTextStyle } from "@/style/PostStyle";

export const PostPlaceListComponent: FC = () => {
  const { data, loading, refetch } = useGetPostPlacesAndCategoriesQuery({
    variables: { idFilter: null, nameFilter: null, categoryFilter: null },
    fetchPolicy: "network-only",
  });
  const [allPlaceLength, setAllPlaceLength] = useState<number | undefined>(
    undefined
  );
  const [nameFilter, setNameFilter] = useState<string | undefined>(undefined);
  const placeList = data?.getPostPlaces ?? [];
  const categoryList = data?.getMyPostCategories ?? [];

  const onClickFilter = () => {
    refetch({ nameFilter: nameFilter ? nameFilter : null });
  };

  useEffect(() => {
    if (data && allPlaceLength == null) {
      setAllPlaceLength(data.getPostPlaces.length);
    }
  }, [data, allPlaceLength]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {allPlaceLength != null && (
        <>
          {allPlaceLength === 0 && <>場所が未登録です</>}
          {allPlaceLength > 0 && (
            <div className="max-w-[90%] min-w-[320px]">
              <div className="flex gap-3 mb-3 w-[330px]">
                <Input
                  value={nameFilter}
                  className={`${inputTextStyle({ type: "short" })}`}
                  labelProps={{
                    className: inputTextLabelStyle(),
                  }}
                  onChange={(e) => setNameFilter(e.target.value)}
                  placeholder="検索したい場所名"
                  crossOrigin={undefined}
                />
                <Button
                  variant="filled"
                  disabled={loading}
                  className="w-[150px]"
                  onClick={onClickFilter}
                  color="light-blue"
                >
                  絞り込み
                </Button>
              </div>
              {placeList.length === 0 && <>指定した条件の場所はありません</>}
              {placeList.length > 0 && (
                <div className="flex flex-col gap-5 max-w-[340px]">
                  {placeList.map((place) => {
                    return (
                      <div key={place.id} className="min-w-[300px]">
                        {place.url && (
                          <Link
                            href={place.url}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-wrap break-all text-xl min-w-[320px] underline text-blue-600 hover:text-blue-800"
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
                          <div className={`${detailTextStyle()}`}>
                            {place.detail}
                          </div>
                          <div className="text-wrap break-all">
                            {place?.address}
                          </div>
                          <div className="text-wrap break-all">
                            {place.categoryIdList
                              .map(
                                (id) =>
                                  categoryList.find((c) => c.id === id)?.name
                              )
                              .join("、")}
                          </div>
                        </div>
                        <div className="mt-4">
                          <PostPlaceActionComponent
                            place={place}
                            actionType="update"
                            refetchPlaceFunc={refetch}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
