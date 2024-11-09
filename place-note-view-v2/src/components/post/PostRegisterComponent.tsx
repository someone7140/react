"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button, Spinner } from "@material-tailwind/react";

import {
  POST_LIST_PAGE_PATH,
  POST_PLACE_ADD_PAGE_PATH,
} from "@/components/menu/constants/MenuPathConstants";
import {
  PostInputComponent,
  PostInputFormType,
  SelectPostPlaceAndCategories,
} from "@/components/post/input/PostInputComponent";
import { PostPlaceListComponent } from "@/components/postPlace/PostPlaceListComponent";
import {
  useAddPostMutation,
  useGetPostPlacesAndCategoriesQuery,
} from "@/graphql/gen/graphql";
import { pageTitleStyle } from "@/style/CommonStyle";

type Props = {
  placeId?: string;
};

export const PostRegisterComponent: FC<Props> = ({ placeId }) => {
  const router = useRouter();
  const [isSelectedPlaceMethod, setIsSelectedPlaceMethod] =
    useState<boolean>(false);
  const [selectPostPlaceAndCategories, setSelectPostPlaceAndCategories] =
    useState<SelectPostPlaceAndCategories | undefined>(undefined);
  const [addPost, { loading: addPostLoading }] = useAddPostMutation();

  const { data, loading } = useGetPostPlacesAndCategoriesQuery({
    variables: { idFilter: placeId, nameFilter: null, categoryFilter: null },
    fetchPolicy: "network-only",
    skip: !placeId,
  });
  const execSubmit = async (formData: PostInputFormType) => {
    const result = await addPost({
      variables: {
        title: formData.title,
        visitedDate: formData.visitedDate,
        placeId: placeId
          ? placeId
          : selectPostPlaceAndCategories?.postPlace.id ?? "",
        categoryIdList: formData.categoryIdList,
        isOpen: formData.isOpen,
        detail: formData.detail ?? null,
        urlList: formData.urlList,
      },
    });

    const addPostResult = result.data?.addPost;
    if (result.errors || !addPostResult) {
      toast.error("登録に失敗しました");
    } else {
      toast("投稿を登録しました");
      router.push(POST_LIST_PAGE_PATH);
    }
  };

  const onClickPlaceSelect = () => {
    setIsSelectedPlaceMethod(true);
  };

  const onClickAddPlace = () => {
    router.push(`${POST_PLACE_ADD_PAGE_PATH}?isFromPost=true`);
  };

  const selectPlaceAction = (
    postPlaceAndCategories: SelectPostPlaceAndCategories
  ) => {
    setSelectPostPlaceAndCategories(postPlaceAndCategories);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {placeId && data && data.getPostPlaces.length > 0 && (
        <>
          <div className={pageTitleStyle()}>
            「{data.getPostPlaces[0].name}」で投稿
          </div>
          <PostInputComponent
            execSubmit={execSubmit}
            disabledFlag={addPostLoading}
            selectPostPlaceAndCategories={{
              postPlace: data.getPostPlaces[0],
              categories: data.getMyPostCategories,
            }}
          />
        </>
      )}
      {!placeId && (
        <>
          <div className={pageTitleStyle()}>
            {selectPostPlaceAndCategories
              ? `「${selectPostPlaceAndCategories.postPlace.name}」で投稿`
              : "投稿する場所"}
          </div>
          {!isSelectedPlaceMethod && (
            <div className="flex flex-col gap-6 items-center mt-6">
              <Button
                color="indigo"
                onClick={onClickPlaceSelect}
                className="w-[180px]"
              >
                登録済みの場所を選択
              </Button>
              <Button
                color="indigo"
                onClick={onClickAddPlace}
                className="w-[180px]"
              >
                新規に場所を追加
              </Button>
            </div>
          )}
          {isSelectedPlaceMethod && (
            <>
              {!selectPostPlaceAndCategories && (
                <>
                  <PostPlaceListComponent selectAction={selectPlaceAction} />
                  <div className="flex mt-4 justify-center">
                    <Button
                      color="blue-gray"
                      onClick={() => {
                        setIsSelectedPlaceMethod(false);
                      }}
                    >
                      選択へ戻る
                    </Button>
                  </div>
                </>
              )}
              {selectPostPlaceAndCategories && (
                <PostInputComponent
                  execSubmit={execSubmit}
                  disabledFlag={addPostLoading}
                  selectPostPlaceAndCategories={selectPostPlaceAndCategories}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
