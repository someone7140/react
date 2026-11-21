import { create } from "zustand";

import { UserAccountAuthResponseFragment } from "@/graphql/gen/graphql";

const AUTH_TOKEN_KEY = "authToken";

const getInitialAuthToken = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(AUTH_TOKEN_KEY);
    return raw ? (JSON.parse(raw) as string) : undefined;
  } catch {
    return undefined;
  }
};

type StoreAccount = {
  userAccount: UserAccountAuthResponseFragment | undefined;
  authToken: string | undefined;
  setUserAccount: (user: UserAccountAuthResponseFragment) => void;
  setAuthToken: (token: string | undefined) => void;
  removeUserAccount: () => void;
};

export const useAuthStore = create<StoreAccount>((set) => ({
  userAccount: undefined,
  authToken: getInitialAuthToken(),
  setUserAccount: (user) => set(() => ({ userAccount: user })),
  setAuthToken: (token) => set({ authToken: token }),
  removeUserAccount: () => set({ userAccount: undefined }),
}));
