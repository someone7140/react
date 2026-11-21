"use client";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { UserAccountAuthResponseFragment } from "@/graphql/gen/graphql";

const AUTH_TOKEN_KEY = "authToken";

export const useAuthManagement = () => {
  const { userAccount, authToken, setUserAccount, setAuthToken, removeUserAccount } =
    useAuthStore();

  const updateAuthInfo = (user: UserAccountAuthResponseFragment) => {
    setUserAccount(user);
    setAuthToken(user.authToken);
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(user.authToken));
  };

  const removeAuthInfo = () => {
    removeUserAccount();
    setAuthToken(undefined);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  };

  return {
    userAccount,
    authToken,
    updateAuthInfo,
    removeAuthInfo,
  };
};
