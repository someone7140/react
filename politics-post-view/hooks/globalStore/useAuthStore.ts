import { create } from "zustand";

import { UserAccountAuthResponse } from "@/graphql/gen/graphql";

type StoreAccount = {
  userAccount: UserAccountAuthResponse | undefined;
  setUserAccount: (user: UserAccountAuthResponse) => void;
  removeUserAccount: () => void;
};

export const useAuthStore = create<StoreAccount>((set) => ({
  userAccount: undefined,
  setUserAccount: (user) => set(() => ({ userAccount: user })),
  removeUserAccount: () => set({ userAccount: undefined }),
}));
