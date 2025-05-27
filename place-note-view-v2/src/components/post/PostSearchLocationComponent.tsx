"use client";

import React, { FC, useState } from "react";
import { Button, Input, Radio, Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";

import { PostListDisplayComponent } from "./list/PostListDisplayComponent";
import { PostListOrderSettingComponent } from "./list/PostListOrderSettingComponent";
import {
  GetMyPostsByLatLonQueryVariables,
  PostCategoryResponse,
  PostPlaceResponse,
  PostResponse,
  useGetMyPostsByLatLonQuery,
  useGetPostPlacesAndCategoriesQuery,
} from "@/graphql/gen/graphql";
import { useGeolocationService } from "@/hooks/geolocation/useGeolocationService";
import { inputTextLabelStyle, inputTextStyle } from "@/style/FormStyle";

export type PostListFilter = {
  category?: PostCategoryResponse;
  place?: PostPlaceResponse;
};

export const PostSearchLocationComponent: FC = ({}) => {
  const [isKeywordSearch, setIsKeywordSearch] = useState<boolean>(true);
  const [isOrderPostDate, setIsOrderPostDate] = useState<boolean>(false);
  const [addressKeyword, setAddressKeyword] = useState<string>("");
  const [radiusKiloMeter, setRadiusKiloMeter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [postList, setPostList] = useState<PostResponse[] | undefined>(
    undefined
  );

  const { refetch } = useGetMyPostsByLatLonQuery({
    fetchPolicy: "network-only",
    skip: true,
  });
  const { data: placeAndCategories } = useGetPostPlacesAndCategoriesQuery({
    variables: { idFilter: null, nameFilter: null, categoryFilter: null },
    fetchPolicy: "network-only",
  });

  const { getAddressInfo } = useGeolocationService();

  const switchOrderPostDate = (isOrderPostDateInput: boolean) => {
    setIsOrderPostDate(isOrderPostDateInput);
  };

  const fetchMyPostsByLatLon = async (
    variables: GetMyPostsByLatLonQueryVariables
  ) => {
    setLoading(true);
    const result = await refetch(variables);
    if (result.error || !result.data?.getMyPostsByLatLon) {
      toast.error("投稿の取得に失敗しました");
    } else {
      setPostList(result.data.getMyPostsByLatLon);
    }
    setLoading(false);
  };

  const submitSearchPost = async () => {
    // 半径の入力チェック
    const radiusKiloMeterFloat = parseFloat(radiusKiloMeter);
    if (isNaN(radiusKiloMeterFloat)) {
      toast.error("半径を入力してください");
      return;
    }

    if (isKeywordSearch) {
      if (!addressKeyword) {
        toast.error("キーワードを入力してください");
        return;
      }
      // キーワードから位置情報を取得
      const addressInfo = await getAddressInfo(addressKeyword);
      if (!addressInfo) {
        toast.error("キーワードから位置情報を取得できませんでした");
        return;
      }

      // 検索
      fetchMyPostsByLatLon({
        latLon: {
          lat: addressInfo.latLon.lat,
          lon: addressInfo.latLon.lon,
        },
        radiusKiloMeter: radiusKiloMeterFloat,
        isOrderPostDate: isOrderPostDate,
      });
    } else {
      // 端末の位置情報を取得
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // 検索
        fetchMyPostsByLatLon({
          latLon: {
            lat: latitude,
            lon: longitude,
          },
          radiusKiloMeter: radiusKiloMeterFloat,
          isOrderPostDate: isOrderPostDate,
        });
      });
    }
  };

  return (
    <div className="max-w-[90%] min-w-[320px]">
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex gap-2">
          <Radio
            name="isKeywordSearch"
            label="住所で検索"
            checked={isKeywordSearch}
            crossOrigin={undefined}
            onChange={() => {
              setIsKeywordSearch(true);
            }}
          />
          <Radio
            name="isKeywordSearch"
            label="現在位置で検索"
            onChange={() => {
              setIsKeywordSearch(false);
            }}
            crossOrigin={undefined}
          />
        </div>
        {isKeywordSearch && (
          <Input
            value={addressKeyword}
            className={inputTextStyle()}
            labelProps={{
              className: inputTextLabelStyle(),
            }}
            onChange={(e) => {
              {
                setAddressKeyword(e.target.value);
              }
            }}
            placeholder="住所キーワード"
            crossOrigin={undefined}
          />
        )}
        <Input
          value={radiusKiloMeter != null ? radiusKiloMeter : ""}
          className={inputTextStyle()}
          labelProps={{
            className: inputTextLabelStyle(),
          }}
          onChange={(e) => {
            {
              setRadiusKiloMeter(e.target.value);
            }
          }}
          placeholder="半径(km)"
          crossOrigin={undefined}
        />
        <PostListOrderSettingComponent
          isOrderPostDate={isOrderPostDate}
          switchOrderPostDate={switchOrderPostDate}
        />
        <Button
          variant="filled"
          className="w-[80px] pl-1 pr-1"
          onClick={() => {
            submitSearchPost();
          }}
          color="light-blue"
          disabled={loading}
        >
          検索
        </Button>
      </div>
      {loading && <Spinner />}
      {!loading && postList && (
        <>
          {postList.length === 0 && <div>指定した条件の投稿はありません</div>}
          {postList.length > 0 && (
            <div className="flex justify-center">
              <PostListDisplayComponent
                postList={postList}
                categoryList={placeAndCategories?.getMyPostCategories ?? []}
                refetch={submitSearchPost}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
