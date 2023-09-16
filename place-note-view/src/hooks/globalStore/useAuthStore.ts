import { create } from "zustand";

import { UserAccountResponse } from "@/gen/placeNote_pb";

type StoreAccount = {
  userAccount: UserAccountResponse | undefined;
  setUserAccount: (user: UserAccountResponse) => void;
  removeUserAccount: () => void;
};

export const useAuthStore = create<StoreAccount>((set) => ({
  userAccount: undefined,
  setUserAccount: (user: UserAccountResponse) =>
    set(() => ({ userAccount: user })),
  removeUserAccount: () => set({ userAccount: undefined }),
}));
