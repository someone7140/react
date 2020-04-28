import React, { useContext, useEffect, useRef } from "react";
import { GoogleApiWrapper, Marker, Map } from "google-maps-react";
import { MapStore } from "../../store/MapStore";
import { setGeocoder } from "../../service/GeolocationService";
import { updateStore } from "../../service/StoreService";

export const GoogleMapComponent = ({ google }) => {
  const { state, dispatch } = useContext(MapStore);
  const location = state.currentLocation;
  const mapStyle = {
    width: "100%",
    height: "85%",
  };
  var markerList = [];

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      const geocoder = new google.maps.Geocoder();
      setGeocoder(dispatch, geocoder);
    }
    mounted.current = true;
  }, [google, dispatch]);

  state.displayStoreList.map((s, i) => {
    return markerList.push(
      <Marker
        key={i}
        title={s.name}
        label={s.name}
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
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
})(GoogleMapComponent);
