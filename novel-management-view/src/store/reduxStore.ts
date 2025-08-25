import { useDispatch, useSelector, useStore } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  Persistor,
} from "redux-persist";

import { persistedAuthStorageReducer } from "./slice/authStorageSlice";
import { userAccountSlice } from "./slice/userAccountSlice";

const rootReducer = combineReducers({
  userAccount: userAccountSlice.reducer,
  authStorage: persistedAuthStorageReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const makePersistor = (store: AppStore): Persistor => {
  return persistStore(store);
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppPersistor = ReturnType<typeof makePersistor>;
export type AppRootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppRootState>();
export const useAppStore = useStore.withTypes<AppStore>();
