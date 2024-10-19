"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

import { POST_PLACE_LIST_PAGE_PATH } from "@/components/menu/constants/MenuPathConstants";
import {
  PostPlaceInputComponent,
  PostPlaceInputFormType,
} from "@/components/postPlace/input/PostPlaceInputComponent";
import {
  LatLon,
  useEditPostPlaceMutation,
  useGetPostPlacesAndCategoriesQuery,
} from "@/graphql/gen/graphql";
import { useGeolocationService } from "@/hooks/geolocation/useGeolocationService";

type Props = {
  placeId: string;
};

export const PostPlaceEditComponent: FC<Props> = ({ placeId }) => {
  const { data, loading } = useGetPostPlacesAndCategoriesQuery({
    variables: { idFilter: placeId, nameFilter: null, categoryFilter: null },
    fetchPolicy: "network-only",
  });
  const [editPostPlace, { loading: editPostPlaceLoading }] =
    useEditPostPlaceMutation();
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

    const result = await editPostPlace({
      variables: {
        id: placeId,
        name: formData.name,
        address: formData.address ?? null,
        latLon: latLon ?? null,
        prefectureCode: prefectureCode ?? null,
        detail: formData.detail ?? null,
        url: formData.url ?? null,
        categoryIdList: formData.categoryIdList,
      },
    });

    const editPostPlaceResult = result.data?.editPostPlace;
    if (result.errors || !editPostPlaceResult) {
      toast.error("更新に失敗しました");
    } else {
      toast("場所を更新しました");
      router.push(POST_PLACE_LIST_PAGE_PATH);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {data && data.getPostPlaces.length > 0 && (
        <PostPlaceInputComponent
          execSubmit={execSubmit}
          disabledFlag={editPostPlaceLoading}
          categoryList={data.getMyPostCategories}
          registeredPlace={data.getPostPlaces[0]}
        />
      )}
    </>
  );
};
