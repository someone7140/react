const TwitterSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case "MAKE_LINK":
      return {
        ...state,
        errorFlg: action.errorFlg,
        localStorageReadFlg: action.localStorageReadFlg,
      };
    case "UPDATE_LINK_INFOS":
      return {
        ...state,
        twitterLinkInfos: action.twitterLinkInfos,
      };
    default:
      return state;
  }
};

export default TwitterSearchReducer;
