const MapReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return {
        ...state,
        currentLocation: action.currentLocation,
        selectedCategory: action.selectedCategory,
        storeList: action.storeList,
        displayStoreList: action.displayStoreList,
      };
    case "CHANGE_CHOICE_TYPE":
      return {
        ...state,
        displayStoreList: action.displayStoreList,
        choiceType: action.choiceType,
      };
    case "SET_GEOCODER":
      return {
        ...state,
        geocoder: action.geocoder,
      };
    default:
      return state;
  }
};

export default MapReducer;
