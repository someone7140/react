"use client";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";
import { AuthUserResponse } from "@/restHandler/common/commonRestType";

export const useAuthManagement = () => {
  const authStore = useAuthStore();
  const { removeAuthToken, updateAuthToken } = useAuthTokenLocalStorage();

  const setAuthInfo = (accountData: AuthUserResponse) => {
    updateAuthToken(accountData.authToken);
    authStore.setUserAccount(accountData);
  };

  const removeAuthInfo = () => {
    authStore.removeUserAccount();
    removeAuthToken();
  };

  return { setAuthInfo, removeAuthInfo };
};
