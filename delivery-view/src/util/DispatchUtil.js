export function changeLocationDispatch(
  dispatch,
  latitude,
  longitude,
  selectedCategory,
  storeList,
  displayStoreList
) {
  dispatch({
    type: "CHANGE_LOCATION",
    currentLocation: {
      latitude: latitude,
      longitude: longitude,
    },
    selectedCategory: selectedCategory,
    storeList: storeList,
    displayStoreList: displayStoreList,
  });
}

export function changeChoiceTypeDispatch(
  dispatch,
  displayStoreList,
  choiceType
) {
  dispatch({
    type: "CHANGE_CHOICE_TYPE",
    displayStoreList: displayStoreList,
    choiceType: choiceType,
  });
}

export function setGeocoderDispatch(dispatch, geocoder) {
  dispatch({
    type: "SET_GEOCODER",
    geocoder: geocoder,
  });
}

export function setCategoryLDispatch(dispatch, categoryLList) {
  dispatch({
    type: "SET_CATEGORY_L_LIST",
    categoryLList: categoryLList,
  });
}

export function setSelectedCategoryDispatch(dispatch, categoryList) {
  dispatch({
    type: "SET_SELECT_CATEGORY",
    selectedCategory: categoryList,
  });
}
