import { create } from "zustand";

export const useAuthStore = create((set) => ({
  userAccount: undefined,
  setUserAccount: (user) => set(() => ({ userAccount: user })),
  removeUserAccount: () => set({ userAccount: undefined }),
}));
