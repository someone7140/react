import axios from "axios";
import {
  changeLocationDispatch,
  changeChoiceTypeDispatch,
} from "..//util/DispatchUtil";

export function updateStore(
  dispatch,
  latitude,
  longitude,
  selectedCategory,
  choiceType
) {
  try {
    axios
      .post(`${process.env.REACT_APP_STORE_API_DOMAIN}/searchStore`, {
        latitude: latitude,
        longitude: longitude,
        range: 3,
        category_l: selectedCategory.join(),
      })
      .then((results) => {
        if (results.status === 200) {
          const storeList = results.data;
          const displayStoreList = storeList.filter(
            (s) =>
              choiceType.length > 0 &&
              (s.type === "all" || choiceType.includes(s.type))
          );
          changeLocationDispatch(
            dispatch,
            latitude,
            longitude,
            selectedCategory,
            storeList,
            displayStoreList
          );
        } else {
          changeLocationDispatch(
            dispatch,
            latitude,
            longitude,
            selectedCategory,
            []
          );
        }
      })
      .catch(() => {
        changeLocationDispatch(
          dispatch,
          latitude,
          longitude,
          selectedCategory,
          []
        );
      });
  } catch (e) {
    changeLocationDispatch(dispatch, latitude, longitude, selectedCategory, []);
  }
}

export function updateChoiceType(state, dispatch, choiceType) {
  const displayStoreList = state.storeList.filter(
    (s) =>
      choiceType.length > 0 && (s.type === "all" || choiceType.includes(s.type))
  );
  changeChoiceTypeDispatch(dispatch, displayStoreList, choiceType);
}
