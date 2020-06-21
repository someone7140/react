import React, { useReducer } from "react";
import TwitterSearchReducer from "../reducer/TwitterSearchReducer";

const initialState = {
  errorFlg: false,
  localStorageReadFlg: true,
  twitterLinkInfos: [],
};

const TwitterSearchStore = React.createContext();

const TwitterSearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TwitterSearchReducer, initialState);
  return (
    <TwitterSearchStore.Provider value={{ state, dispatch }}>
      {children}
    </TwitterSearchStore.Provider>
  );
};

export { TwitterSearchProvider, TwitterSearchStore };
