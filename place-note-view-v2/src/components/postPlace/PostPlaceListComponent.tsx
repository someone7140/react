"use client";

import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@material-tailwind/react";

import { PostPlaceListDisplayComponent } from "./list/PostPlaceListDisplayComponent";

import {
  POST_ADD_PAGE_PATH,
  POST_EDIT_PAGE_PATH,
} from "@/constants/MenuPathConstants";
import { usePostInputSessionStore } from "@/hooks/inputSessionStore/usePostSessionStore";
import {
  PostPlaceResponse,
  useGetPostPlacesAndCategoriesQuery,
} from "@/graphql/gen/graphql";

type Props = {
  editPostId?: string;
};

export const PostPlaceListComponent: FC<Props> = ({ editPostId }) => {
  const router = useRouter();
  const { data, loading, refetch } = useGetPostPlacesAndCategoriesQuery({
    variables: { idFilter: null, nameFilter: null, categoryFilter: null },
    fetchPolicy: "network-only",
  });
  const [allPlaceLength, setAllPlaceLength] = useState<number | undefined>(
    undefined
  );
  const [nameFilter, setNameFilter] = useState<string>("");
  const placeList = data?.getPostPlaces ?? [];
  const categoryList = data?.getMyPostCategories ?? [];
  const { updatePostInputSession } = usePostInputSessionStore();

  const onClickFilter = () => {
    refetch({ nameFilter: nameFilter ? nameFilter : null });
  };

  const selectActionForPost = (place: PostPlaceResponse) => {
    updatePostInputSession(undefined);
    if (editPostId) {
      router.push(
        `${POST_EDIT_PAGE_PATH}?id=${editPostId}&placeId=${place.id}`
      );
    } else {
      router.push(`${POST_ADD_PAGE_PATH}?placeId=${place.id}`);
    }
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
              <PostPlaceListDisplayComponent
                placeList={placeList}
                categoryList={categoryList}
                nameFilter={nameFilter}
                setNameFilter={setNameFilter}
                onClickFilter={onClickFilter}
                selectActionForPost={selectActionForPost}
                refetch={refetch}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
