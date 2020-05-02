import { updateStore } from "./StoreService";
import { setGeocoderDispatch } from "../util/DispatchUtil";

export function setCurrentLocation(state, dispatch) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      callStoreUpdate(
        state,
        dispatch,
        pos.coords.latitude,
        pos.coords.longitude
      );
    },
    () => {
      // 取得不可の場合は初期値をセット
      callStoreUpdate(state, dispatch, 35.681236, 139.767125);
    }
  );
}

export function setGeocoder(dispatch, geocoder) {
  setGeocoderDispatch(dispatch, geocoder);
}

export function searchPlace(state, dispatch, place) {
  if (place === "") {
    setCurrentLocation(state, dispatch);
  } else {
    state.geocoder.geocode(
      {
        address: place,
        region: "jp",
      },
      function (results, status) {
        if (status === "OK") {
          const location = results[0].geometry.location;
          callStoreUpdate(state, dispatch, location.lat(), location.lng());
        }
      }
    );
  }
}

function callStoreUpdate(state, dispatch, latitude, longitude) {
  updateStore(
    dispatch,
    latitude,
    longitude,
    state.selectedCategory,
    state.choiceType
  );
}
