import { updateStore } from "./StoreService";

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
      callStoreUpdate(state, dispatch, 35.681236, 139.767125);
    }
  );
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
