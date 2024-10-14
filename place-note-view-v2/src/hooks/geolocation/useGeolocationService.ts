import {
  LatLonResponse,
  useGetLatLonFromAddressLazyQuery,
} from "@/graphql/gen/graphql";
import { MUNI_LIST } from "./muni";

interface AddressInfo {
  latLon: LatLonResponse;
  prefectureCode?: string;
}

export const useGeolocationService = () => {
  const [getLatLonFromAddress] = useGetLatLonFromAddressLazyQuery();

  // 緯度・経度を項目として持つ型を受け取る
  const getPrefectureCodeFromLatLon = async (latLon: LatLonResponse) => {
    const muniCd = await getMuniCdFromLatLon(latLon);
    if (!muniCd) {
      return undefined;
    }

    return getPrefectureCodeFromMuniCd(muniCd);
  };

  // 緯度・経度からmuniCdを取得
  const getMuniCdFromLatLon = async (latLon: LatLonResponse) => {
    type LonLatToAddress = {
      results?: {
        muniCd: string;
        lv01Nm: string;
      };
    };

    const response = await fetch(
      `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${latLon.lat}&lon=${latLon.lon}`
    );
    if (!response.ok) {
      return undefined;
    }

    const lonLatToAddress: LonLatToAddress = await response.json();
    return lonLatToAddress.results?.muniCd;
  };

  // muniCdから都道府県コードを取得
  const getPrefectureCodeFromMuniCd = (muniCdInput: string) => {
    // 先頭が0の場合は除去
    const muniCd =
      muniCdInput.substring(0, 1) === "0" ? muniCdInput.slice(1) : muniCdInput;
    // muni.jsの一覧を元にしたリストから中身を取得
    const muniContents = MUNI_LIST.MUNI_ARRAY[muniCd];
    if (!muniContents) {
      return undefined;
    }

    // カンマ区切りの一番最初の値が都道府県コード
    return muniContents.split(",")[0];
  };

  // 住所をもとに付帯情報を取得
  const getAddressInfo = async (
    address: string
  ): Promise<AddressInfo | undefined> => {
    let latLon: LatLonResponse | undefined = undefined;
    try {
      // 緯度経度を取得
      const result = await getLatLonFromAddress({ variables: { address } });
      if (result) {
        latLon = result.data?.getLatLonFromAddress ?? undefined;
      }
    } catch (e) {
      //何もしない
    }

    if (!latLon) {
      return undefined;
    }

    const prefectureCode = await getPrefectureCodeFromLatLon(latLon);

    return {
      latLon,
      prefectureCode,
    };
  };

  // 都道府県コードと名前のリスト
  const prefectureMap = new Map(
    Object.entries(MUNI_LIST.MUNI_ARRAY).map(([key, value]) => {
      // muniCdから都道府県コードを取得
      const code = key.length > 4 ? key.substring(0, 2) : key.substring(0, 1);
      // カンマ区切りの二つ目から都道府県の名前を取得
      const name = value.split(",")[1];
      return [code, name];
    })
  );

  return { getAddressInfo, prefectureMap };
};
