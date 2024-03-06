import { create } from "zustand";

import { AccountUserResponse } from "@/query/graphqlGen/graphql";

type StoreAccount = {
  userAccount: AccountUserResponse | undefined;
  setUserAccount: (user: AccountUserResponse) => void;
  removeUserAccount: () => void;
};

export const useAuthStore = create<StoreAccount>((set) => ({
  userAccount: undefined,
  setUserAccount: (user: any) => set(() => ({ userAccount: user })),
  removeUserAccount: () => set({ userAccount: undefined }),
}));
