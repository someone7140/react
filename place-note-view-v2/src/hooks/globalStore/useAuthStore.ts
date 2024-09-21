import { create } from "zustand";

import { AccountUserResponse } from "@/graphql/gen/graphql";

type StoreAccount = {
  userAccount: AccountUserResponse | undefined;
  setUserAccount: (user: AccountUserResponse) => void;
  removeUserAccount: () => void;
};

export const useAuthStore = create<StoreAccount>((set) => ({
  userAccount: undefined,
  setUserAccount: (user) => set(() => ({ userAccount: user })),
  removeUserAccount: () => set({ userAccount: undefined }),
}));
