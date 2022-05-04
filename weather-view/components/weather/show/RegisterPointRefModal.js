import { useState } from "react";

import RegisterPointComponent from "../register/RegisterPointComponent";

export default function RegisterPointRefModal(prop) {
  const [openModal, setOpenModal] = useState(false);

  const weatherInfo = prop.weatherInfo;

  function onCloseModal() {
    setOpenModal(false);
  }
  function onPointClick() {
    setOpenModal(true);
  }

  function onUpdateData() {
    setOpenModal(false);
    prop.onUpdateData();
  }
  return (
    <>
      <div
        style={{ color: "blue", cursor: "pointer" }}
        role="button"
        onClick={onPointClick}
      >
        {weatherInfo.getPointname()}
      </div>
      <RegisterPointComponent
        openModal={openModal}
        onCloseModal={onCloseModal}
        onUpdateData={onUpdateData}
        pointId={weatherInfo.getPointid()}
        pointName={weatherInfo.getPointname()}
        displayOrder={weatherInfo.getDisplayorder()}
        initialGeographicPoint={{
          latitude: weatherInfo.getLat(),
          longitude: weatherInfo.getLon(),
        }}
      />
    </>
  );
}
