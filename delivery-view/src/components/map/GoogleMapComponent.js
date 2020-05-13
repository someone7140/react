import React, { useContext, useEffect, useRef, useState } from "react";
import { GoogleApiWrapper, InfoWindow, Marker, Map } from "google-maps-react";
import { MapStore } from "../../store/MapStore";
import { setGeocoder } from "../../service/GeolocationService";
import { updateStore } from "../../service/StoreService";

const mapStyle = {
  width: "100%",
  height: "80%",
};

export const GoogleMapComponent = ({ google }) => {
  const { state, dispatch } = useContext(MapStore);
  const [infoWindowState, setInfoWindowState] = useState({
    markerInfo: {},
    visible: false,
  });
  const location = state.currentLocation;
  var markerList = [];

  const onMarkerClick = (_, marker) => {
    // markerListから該当のレコードを取得
    const markerInfo = state.displayStoreList.find((m) => m.id === marker.name);
    if (markerInfo) {
      setInfoWindowState({
        activeMarker: marker,
        markerInfo: markerInfo,
        visible: true,
      });
    }
  };

  function onInfoWindowClose() {
    setInfoWindowState({
      markerInfo: {},
      visible: false,
    });
  }

  const googleMounted = useRef(false);
  useEffect(() => {
    if (!googleMounted.current) {
      const geocoder = new google.maps.Geocoder();
      setGeocoder(dispatch, geocoder);
    }
    googleMounted.current = true;
  }, [google, dispatch]);

  state.displayStoreList.map((s) => {
    return markerList.push(
      <Marker
        key={s.id}
        name={s.id}
        title={s.name}
        label={s.name}
        onClick={onMarkerClick}
        position={{ lat: s.latitude, lng: s.longitude }}
      />
    );
  });
  const centerMoved = (_, map) => {
    // 変更後の中心を取得
    const center = map.getCenter();
    // 店情報の更新
    updateStore(
      dispatch,
      center.lat(),
      center.lng(),
      state.selectedCategory,
      state.choiceType
    );
  };
  return (
    <Map
      google={google}
      zoom={16}
      style={mapStyle}
      center={{ lat: location.latitude, lng: location.longitude }}
      initialCenter={{ lat: location.latitude, lng: location.longitude }}
      onDragend={centerMoved}
    >
      {markerList}
      <InfoWindow
        marker={infoWindowState.activeMarker}
        onClose={onInfoWindowClose}
        visible={infoWindowState.visible}
      >
        <div>
          <a
            href={infoWindowState.markerInfo.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {infoWindowState.markerInfo.name}
          </a>
          <br />
          {infoWindowState.markerInfo.category}
          <br />
          {infoWindowState.markerInfo.image &&
            infoWindowState.markerInfo.image.length > 0 && (
              <img
                src={infoWindowState.markerInfo.image}
                alt={infoWindowState.markerInfo.name}
              />
            )}
          <br />
          {infoWindowState.markerInfo.type === "all" && (
            <span>テイクアウト・デリバリー可</span>
          )}
          {infoWindowState.markerInfo.type === "deliverly" && (
            <span>デリバリー可</span>
          )}
          {infoWindowState.markerInfo.type === "takeout" && (
            <span>テイクアウト可</span>
          )}
          <br />
          【営業日】{infoWindowState.markerInfo.opentime}
          <br />
          【休日】{infoWindowState.markerInfo.holiday}
          <br />
          {infoWindowState.markerInfo.pr}
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
})(GoogleMapComponent);
