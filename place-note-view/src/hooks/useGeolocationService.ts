import { MUNI_LIST } from "@/constants/muni";
import { LatLon } from "@/gen/placeNoteCommon_pb";

export const useGeolocationService = () => {
  // 緯度・経度を項目として持つ型を受け取る
  const getPrefectureCodeFromLatLon = async (latLon: LatLon) => {
    const muniCd = await getMuniCdFromLatLon(latLon);
    if (!muniCd) {
      return undefined;
    }

    return getPrefectureCodeFromMuniCd(muniCd);
  };

  // 緯度・経度からmuniCdを取得
  const getMuniCdFromLatLon = async (latLon: LatLon) => {
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

  return { getPrefectureCodeFromLatLon };
};
