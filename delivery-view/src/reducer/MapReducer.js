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
    default:
      return state;
  }
};

export default MapReducer;
