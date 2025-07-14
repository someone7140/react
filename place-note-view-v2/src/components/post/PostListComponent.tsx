"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";

import { PostFilterDialogComponent } from "./dialog/PostFilterDialogComponent";
import { PostListDisplayComponent } from "./list/PostListDisplayComponent";
import { PostListOrderSettingComponent } from "./list/PostListOrderSettingComponent";
import {
  PostResponse,
  useGetMyPostsByLatLonQuery,
  useGetMyPostsQuery,
  useGetPostPlacesAndCategoriesQuery,
} from "@/graphql/gen/graphql";
import {
  PostFilterType,
  usePostListFilterSessionStore,
} from "@/hooks/inputSessionStore/usePostFilterSessionStore";

type Props = {
  placeIdFilter?: string;
};

export const PostListComponent: FC<Props> = ({ placeIdFilter }) => {
  const { postListFilterSession, updatePostListFilterSession } =
    usePostListFilterSessionStore();
  const [placeNameFilter, setPlaceNameFilter] = useState<string>("");
  const [openFilterDialogType, setOpenFilterDialogType] = useState<
    PostFilterType | undefined
  >(undefined);
  const [postList, setPostList] = useState<PostResponse[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);

  const filterItems = [
    {
      key: PostFilterType.Place,
      label: "場所選択",
    },
    {
      key: PostFilterType.Category,
      label: "カテゴリー選択",
    },
    {
      key: PostFilterType.Keyword,
      label: "キーワード入力",
    },
    {
      key: PostFilterType.Location,
      label: "位置指定",
    },
  ];

  const { refetch } = useGetMyPostsQuery({
    fetchPolicy: "network-only",
    skip: true,
  });
  const { refetch: refetchLatLon } = useGetMyPostsByLatLonQuery({
    fetchPolicy: "network-only",
    skip: true,
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

  const searchPost = async () => {
    setLoading(true);
    let postListData: PostResponse[] = [];
    const isOrderPostDate = postListFilterSession?.isOrderPostDate ?? false;
    if (placeIdFilter) {
      postListData = (
        await refetch({
          idFilter: null,
          placeIdFilter: placeIdFilter,
          categoryIdsFilter: null,
          keywordFilter: null,
          isOrderPostDate: isOrderPostDate,
        })
      ).data.getMyPosts;
    } else if (postListFilterSession?.selectType == PostFilterType.Place) {
      postListData = (
        await refetch({
          idFilter: null,
          placeIdFilter: postListFilterSession?.place?.id,
          categoryIdsFilter: null,
          keywordFilter: null,
          isOrderPostDate: isOrderPostDate,
        })
      ).data.getMyPosts;
    } else if (postListFilterSession?.selectType == PostFilterType.Category) {
      postListData = (
        await refetch({
          idFilter: null,
          placeIdFilter: null,
          categoryIdsFilter: postListFilterSession.category?.id,
          keywordFilter: null,
          isOrderPostDate: isOrderPostDate,
        })
      ).data.getMyPosts;
    } else if (postListFilterSession?.selectType == PostFilterType.Keyword) {
      postListData = (
        await refetch({
          idFilter: null,
          placeIdFilter: null,
          categoryIdsFilter: null,
          keywordFilter: postListFilterSession.keyword,
          isOrderPostDate: isOrderPostDate,
        })
      ).data.getMyPosts;
    } else if (postListFilterSession?.selectType == PostFilterType.Location) {
      postListData = (
        await refetchLatLon({
          latLon: {
            lat: postListFilterSession.location?.lat ?? 0,
            lon: postListFilterSession.location?.lon ?? 0,
          },
          radiusKiloMeter: postListFilterSession.location?.radiusKiloMeter,
          isOrderPostDate: isOrderPostDate,
        })
      ).data.getMyPostsByLatLon;
    } else {
      postListData = (
        await refetch({
          idFilter: null,
          placeIdFilter: null,
          categoryIdsFilter: null,
          keywordFilter: null,
          isOrderPostDate: isOrderPostDate,
        })
      ).data.getMyPosts;
    }

    setPostList(postListData);
    setLoading(false);
  };

  useEffect(() => {
    // フィルター条件が変わったら再検索
    searchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postListFilterSession]);

  const switchOrderPostDate = (isOrderPostDateInput: boolean) => {
    if (postListFilterSession) {
      updatePostListFilterSession({
        ...postListFilterSession,
        isOrderPostDate: isOrderPostDateInput,
      });
    } else {
      updatePostListFilterSession({ isOrderPostDate: isOrderPostDateInput });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="max-w-[90%] min-w-[320px]">
        <div className="mb-3">
          <div className="flex flex-row gap-3">
            {!placeIdFilter && (
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-3">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="w-[80px] pl-1 pr-1" color="primary">
                        絞り込み
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Dynamic Actions"
                      items={filterItems}
                    >
                      {(item) => (
                        <DropdownItem
                          key={item.key}
                          onPress={() => {
                            setOpenFilterDialogType(item.key);
                          }}
                        >
                          {item.label}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                  {postListFilterSession?.selectType && (
                    <Button
                      className="w-[70px] pl-1 pr-1"
                      onPress={() => {
                        updatePostListFilterSession(undefined);
                      }}
                      color="default"
                    >
                      クリア
                    </Button>
                  )}
                  <PostFilterDialogComponent
                    openFilterDialogType={openFilterDialogType}
                    closeDialog={() => {
                      setOpenFilterDialogType(undefined);
                    }}
                    postFilter={postListFilterSession}
                    setPostFilter={updatePostListFilterSession}
                    categoryAndPlaceData={placeAndCategories}
                    placeNameFilter={placeNameFilter}
                    setPlaceNameFilter={setPlaceNameFilter}
                    onClickPlaceFilter={onClickPlaceFilter}
                  />
                </div>
                {postListFilterSession?.selectType == PostFilterType.Place && (
                  <div className="mt-2 text-xs">
                    場所「{postListFilterSession?.place?.name}」で絞り込み
                  </div>
                )}
                {postListFilterSession?.selectType ==
                  PostFilterType.Category && (
                  <div className="mt-2 text-xs">
                    カテゴリー「{postListFilterSession?.category?.name}
                    」で絞り込み
                  </div>
                )}
                {postListFilterSession?.selectType ==
                  PostFilterType.Keyword && (
                  <div className="mt-2 text-xs">
                    キーワード「{postListFilterSession?.keyword}」で絞り込み
                  </div>
                )}
                {postListFilterSession?.selectType ==
                  PostFilterType.Location && (
                  <div className="mt-2 text-xs">位置指定で絞り込み</div>
                )}
              </div>
            )}
            <PostListOrderSettingComponent
              isOrderPostDate={postListFilterSession?.isOrderPostDate ?? false}
              switchOrderPostDate={switchOrderPostDate}
            />
          </div>
        </div>
        {postList && (
          <>
            {postList.length === 0 && (
              <div className="mt-4">投稿はありません</div>
            )}
            {postList.length > 0 && (
              <div className="flex justify-center">
                <PostListDisplayComponent
                  postList={postList}
                  categoryList={placeAndCategories?.getMyPostCategories ?? []}
                  refetch={searchPost}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
