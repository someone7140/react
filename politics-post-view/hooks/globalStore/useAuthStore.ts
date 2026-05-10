import { create } from "zustand";

import { UserAccountAuthResponseFragment } from "@/graphql/gen/graphql";

type StoreAccount = {
  userAccount: UserAccountAuthResponseFragment | undefined;
  setUserAccount: (user: UserAccountAuthResponseFragment) => void;
  removeUserAccount: () => void;
};

export const useAuthStore = create<StoreAccount>((set) => ({
  userAccount: undefined,
  setUserAccount: (user) => set(() => ({ userAccount: user })),
  removeUserAccount: () => set({ userAccount: undefined }),
}));
