"use client";

import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { Button, Input, NumberInput, Radio, RadioGroup } from "@heroui/react";

import { useGeolocationService } from "@/hooks/geolocation/useGeolocationService";
import { inputTextStyle } from "@/style/FormStyle";
import {
  PostListFilter,
  PostSearchLocationFilter,
  PostSearchLocationType,
} from "@/hooks/inputSessionStore/usePostFilterSessionStore";

type Props = {
  postFilter?: PostListFilter;
  locationSelect: (selectLocation: PostSearchLocationFilter) => void;
};

export const PostSearchLocationComponent: FC<Props> = ({
  postFilter,
  locationSelect,
}) => {
  const [searchSelected, setSearchSelected] = useState(
    postFilter?.location?.selectType ?? PostSearchLocationType.KeywordSelect
  );
  const [addressKeyword, setAddressKeyword] = useState<string>(
    postFilter?.location?.addressKeyword ?? ""
  );
  const [radiusKiloMeter, setRadiusKiloMeter] = useState<number | undefined>(
    postFilter?.location?.radiusKiloMeter
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { getAddressInfo } = useGeolocationService();

  const submitSearchPost = async () => {
    setLoading(true);
    const isKeywordSearch =
      searchSelected == PostSearchLocationType.KeywordSelect;
    // 半径の入力チェック
    if (!radiusKiloMeter || isNaN(radiusKiloMeter)) {
      toast.error("半径を入力してください");
      setLoading(false);
      return;
    }

    if (isKeywordSearch) {
      if (!addressKeyword) {
        toast.error("キーワードを入力してください");
        setLoading(false);
        return;
      }
      // キーワードから位置情報を取得
      const addressInfo = await getAddressInfo(addressKeyword);
      if (!addressInfo) {
        toast.error("キーワードから位置情報を取得できませんでした");
        setLoading(false);
        return;
      }

      // 検索
      locationSelect({
        selectType: PostSearchLocationType.KeywordSelect,
        addressKeyword: addressKeyword,
        lat: addressInfo.latLon.lat,
        lon: addressInfo.latLon.lon,
        radiusKiloMeter: radiusKiloMeter,
      });
    } else {
      // 端末の位置情報を取得
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // 検索
        locationSelect({
          selectType: PostSearchLocationType.KeywordSelect,
          addressKeyword: addressKeyword,
          lat: latitude,
          lon: longitude,
          radiusKiloMeter: radiusKiloMeter,
        });
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-[90%] min-w-[320px]">
      <div className="flex flex-col gap-2 mb-3">
        <RadioGroup
          className="flex gap-2"
          value={searchSelected}
          onValueChange={(val) => {
            setSearchSelected(val as PostSearchLocationType);
          }}
        >
          <Radio
            name="KeywordSelect"
            value={PostSearchLocationType.KeywordSelect}
          >
            住所で検索
          </Radio>
          <Radio
            name="NowPositionSelect"
            value={PostSearchLocationType.NowPositionSelect}
          >
            現在位置で検索
          </Radio>
        </RadioGroup>

        {searchSelected == PostSearchLocationType.KeywordSelect && (
          <Input
            value={addressKeyword}
            className={inputTextStyle()}
            onChange={(e) => {
              {
                setAddressKeyword(e.target.value);
              }
            }}
            label="住所キーワード"
          />
        )}
        <NumberInput
          hideStepper
          value={radiusKiloMeter}
          className={inputTextStyle()}
          label="半径(km)"
          onChange={(e) => {
            if (typeof e === "number") {
              setRadiusKiloMeter(e);
            }
          }}
        />
        <Button
          className="w-[80px] pl-1 pr-1"
          onPress={() => {
            submitSearchPost();
          }}
          color="primary"
          isLoading={loading}
        >
          検索
        </Button>
      </div>
    </div>
  );
};
