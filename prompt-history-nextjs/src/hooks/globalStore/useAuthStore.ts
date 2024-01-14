import { create } from "zustand";

import { AuthUserResponse } from "@/restHandler/common/commonRestType";

type StoreAccount = {
  userAccount: AuthUserResponse | undefined;
  setUserAccount: (user: AuthUserResponse) => void;
  removeUserAccount: () => void;
};

export const useAuthStore = create<StoreAccount>((set) => ({
  userAccount: undefined,
  setUserAccount: (user: any) => set(() => ({ userAccount: user })),
  removeUserAccount: () => set({ userAccount: undefined }),
}));
