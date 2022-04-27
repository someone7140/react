import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

import RegisterPointComponent from "./register/RegisterPointComponent";
import WeatherOfRegisteredPointsComponent from "./show/WeatherOfRegisteredPointsComponent";

export default function GeographicPointsWeatherComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [initialGeographicPoint, setInitialGeographicPoint] =
    useState(undefined);
  const [refetchTime, setRefetchTime] = useState(0);

  function onCLoseModal() {
    setOpenModal(false);
  }
  function onUpdateData() {
    setOpenModal(false);
    toast("地点のデータを更新しました");
    const nowDate = new Date();
    setRefetchTime(nowDate.getTime());
  }

  useEffect(() => {
    // 現在地を取得
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setInitialGeographicPoint({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        // エラーの場合は初期値を設定
        setInitialGeographicPoint({
          latitude: 35.68754004108044,
          longitude: 139.68464928633472,
        });
      }
    );
  });

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        地点の登録
      </Button>
      {initialGeographicPoint && (
        <RegisterPointComponent
          openModal={openModal}
          onCLoseModal={onCLoseModal}
          onUpdateData={onUpdateData}
          initialGeographicPoint={initialGeographicPoint}
        />
      )}
      <br />
      <WeatherOfRegisteredPointsComponent />
    </>
  );
}
