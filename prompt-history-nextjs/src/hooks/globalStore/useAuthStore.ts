import { create } from "zustand";

type StoreAccount = {
  userAccount: any | undefined;
  setUserAccount: (user: any) => void;
  removeUserAccount: () => void;
};

export const useAuthStore = create<StoreAccount>((set) => ({
  userAccount: undefined,
  setUserAccount: (user: any) => set(() => ({ userAccount: user })),
  removeUserAccount: () => set({ userAccount: undefined }),
}));
