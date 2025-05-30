"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  POST_ADD_PAGE_PATH,
  POST_PLACE_LIST_PAGE_PATH,
} from "@/constants/MenuPathConstants";
import { PostPlaceInputComponent } from "@/components/postPlace/input/PostPlaceInputComponent";
import {
  LatLon,
  useAddPostPlaceMutation,
  useGetMyPostCategoriesQuery,
} from "@/graphql/gen/graphql";
import { useGeolocationService } from "@/hooks/geolocation/useGeolocationService";
import {
  PostPlaceInputFormType,
  usePostPlaceInputSessionStore,
} from "@/hooks/inputSessionStore/usePostPlaceInputSessionStore";
import { usePostInputSessionStore } from "@/hooks/inputSessionStore/usePostSessionStore";

type Props = {
  isFromPost?: boolean;
};

export const PostPlaceRegisterComponent: FC<Props> = ({ isFromPost }) => {
  const [addPostPlace] = useAddPostPlaceMutation();
  const { getAddressInfo } = useGeolocationService();
  const router = useRouter();
  const { data: selectCategoryData } = useGetMyPostCategoriesQuery({
    variables: { nameFilter: null },
    fetchPolicy: "network-only",
  });
  const [addPostPlaceLoading, setAddPostPlaceLoading] = useState(false);
  const { updatePostPlaceInputSession } = usePostPlaceInputSessionStore();
  const { updatePostInputSession } = usePostInputSessionStore();

  const execSubmit = async (formData: PostPlaceInputFormType) => {
    setAddPostPlaceLoading(true);
    // 住所から緯度経度と都道府県コードを取得
    let latLon: LatLon | undefined = undefined;
    let prefectureCode: string | undefined = undefined;
    if (formData.address) {
      const addressInfo = await getAddressInfo(formData.address);
      if (addressInfo?.latLon) {
        latLon = {
          lat: addressInfo.latLon.lat,
          lon: addressInfo.latLon.lon,
        };
      }
      prefectureCode = addressInfo?.prefectureCode;
    }

    const result = await addPostPlace({
      variables: {
        name: formData.name,
        address: formData.address ?? null,
        latLon: latLon ?? null,
        prefectureCode: prefectureCode ?? null,
        detail: formData.detail ?? null,
        url: formData.url ?? null,
        categoryIdList: formData.categoryIdList,
      },
    });

    const addPostPlaceResult = result.data?.addPostPlace;
    if (result.errors || !addPostPlaceResult) {
      toast.error("登録に失敗しました");
      setAddPostPlaceLoading(false);
    } else {
      toast("場所を登録しました");
      updatePostPlaceInputSession(undefined);
      updatePostInputSession(undefined);
      if (isFromPost) {
        router.push(`${POST_ADD_PAGE_PATH}?placeId=${addPostPlaceResult}`);
      } else {
        router.push(POST_PLACE_LIST_PAGE_PATH);
      }
    }
  };

  return (
    <PostPlaceInputComponent
      execSubmit={execSubmit}
      disabledFlag={addPostPlaceLoading}
      categoryList={selectCategoryData?.getMyPostCategories}
    />
  );
};
