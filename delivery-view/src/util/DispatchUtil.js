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
