"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button, Spinner } from "@heroui/react";

import {
  POST_LIST_PAGE_PATH,
  POST_PLACE_ADD_PAGE_PATH,
  POST_PLACE_LIST_PAGE_PATH,
} from "@/constants/MenuPathConstants";
import { PostInputComponent } from "@/components/post/input/PostInputComponent";
import { usePostPlaceInputSessionStore } from "@/hooks/inputSessionStore/usePostPlaceInputSessionStore";
import {
  useAddPostMutation,
  useGetPostPlacesAndCategoriesQuery,
} from "@/graphql/gen/graphql";
import { PostInputFormType } from "@/hooks/inputSessionStore/usePostSessionStore";
import { pageTitleStyle } from "@/style/CommonStyle";

type Props = {
  placeId?: string;
};

export const PostRegisterComponent: FC<Props> = ({ placeId }) => {
  const router = useRouter();
  const [addPost, { loading: addPostLoading }] = useAddPostMutation();
  const { updatePostPlaceInputSession } = usePostPlaceInputSessionStore();

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
        placeId: placeId ? placeId : "",
        categoryIdList: formData.categoryIdList,
        isOpen: formData.isOpen,
        detail: formData.detail ?? null,
        urlList: formData.urlList.filter((url) => !!url),
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
    router.push(`${POST_PLACE_LIST_PAGE_PATH}`);
  };

  const onClickAddPlace = () => {
    updatePostPlaceInputSession(undefined);
    router.push(`${POST_PLACE_ADD_PAGE_PATH}?isFromPost=true`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {placeId && data && data.getPostPlaces.length > 0 && (
        <>
          <div className={`${pageTitleStyle()} mr-5`}>
            「{data.getPostPlaces[0].name}」で投稿
          </div>
          <PostInputComponent
            execSubmit={execSubmit}
            disabledFlag={addPostLoading}
            postCategories={{
              selectCategoriesDefault: data.getPostPlaces[0].categoryIdList,
              categories: data.getMyPostCategories,
            }}
          />
        </>
      )}
      {!placeId && (
        <>
          <div className={pageTitleStyle()}>投稿する場所</div>
          <div className="flex flex-col gap-6 items-center mt-6">
            <Button
              color="primary"
              onPress={onClickPlaceSelect}
              className="w-[180px]"
            >
              登録済みの場所を選択
            </Button>
            <Button
              color="success"
              onPress={onClickAddPlace}
              className="w-[180px]"
            >
              新規に場所を追加
            </Button>
          </div>
        </>
      )}
    </>
  );
};
