import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

type AuthStorageState = { authToken?: string };

export const authStorageSlice = createSlice({
  name: "authStorage",
  initialState: { authToken: undefined } as AuthStorageState,
  reducers: {
    updateAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    clearAuthToken: (state) => {
      state.authToken = undefined;
    },
  },
});

// 永続化設定
const authStoragePersistConfig = {
  key: "authStorage",
  storage,
};

// persistReducerでラップ
export const persistedAuthStorageReducer = persistReducer(
  authStoragePersistConfig,
  authStorageSlice.reducer
);

export const { updateAuthToken, clearAuthToken } = authStorageSlice.actions;
