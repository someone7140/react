import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserAccountResponse } from "@/graphql/gen/graphql";

type UserAccountState = UserAccountResponse | null;

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState: null as UserAccountState,
  reducers: {
    updateUserAccount: (_, action: PayloadAction<UserAccountResponse>) => {
      return action.payload;
    },
    clearUserAccount: () => {
      return null;
    },
  },
});

export const { updateUserAccount, clearUserAccount } = userAccountSlice.actions;
export const userAccountSliceReducer = userAccountSlice.reducer;
