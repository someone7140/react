"use client";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { AccountUserResponse } from "@/query/graphqlGen/graphql";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";

export const useAuthManagement = () => {
  const authStore = useAuthStore();
  const { removeAuthToken, updateAuthToken } = useAuthTokenLocalStorage();

  const setAuthInfo = (accountData: AccountUserResponse) => {
    if (accountData.authToken) {
      updateAuthToken(accountData.authToken);
    }
    authStore.setUserAccount(accountData);
  };

  const removeAuthInfo = () => {
    authStore.removeUserAccount();
    removeAuthToken();
  };

  return { setAuthInfo, removeAuthInfo };
};
