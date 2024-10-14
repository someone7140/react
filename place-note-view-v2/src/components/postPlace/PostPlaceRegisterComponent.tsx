"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { POST_PLACE_LIST_PAGE_PATH } from "@/components/menu/constants/MenuPathConstants";
import {
  PostPlaceInputComponent,
  PostPlaceInputFormType,
} from "@/components/postPlace/input/PostPlaceInputComponent";
import { LatLon, useAddPostPlaceMutation } from "@/graphql/gen/graphql";
import { useGeolocationService } from "@/hooks/geolocation/useGeolocationService";

export const PostPlaceRegisterComponent: FC = () => {
  const [addPostPlace, { loading: addPostPlaceLoading }] =
    useAddPostPlaceMutation();
  const { getAddressInfo } = useGeolocationService();
  const router = useRouter();

  const execSubmit = async (formData: PostPlaceInputFormType) => {
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
    } else {
      toast("場所を登録しました");
      router.push(POST_PLACE_LIST_PAGE_PATH);
    }
  };

  return (
    <PostPlaceInputComponent
      execSubmit={execSubmit}
      disabledFlag={addPostPlaceLoading}
    />
  );
};
