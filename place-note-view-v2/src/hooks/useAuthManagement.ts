"use client";

import { useLocalStorageState } from "ahooks";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { AccountUserResponse } from "@/graphql/gen/graphql";

export const useAuthManagement = () => {
  const { userAccount, setUserAccount, removeUserAccount } = useAuthStore();
  const {
    authTokenLocalStorage,
    updateAuthToken,
    removeAuthTokenLocalStorage,
  } = useAuthTokenLocalStorage();

  const updateAuthInfo = (user: AccountUserResponse) => {
    setUserAccount(user);
    updateAuthToken(user.token);
  };

  const removeAuthInfo = () => {
    removeUserAccount();
    removeAuthTokenLocalStorage();
  };

  return { userAccount, authTokenLocalStorage, updateAuthInfo, removeAuthInfo };
};

const useAuthTokenLocalStorage = () => {
  const [authTokenLocalStorage, setAuthTokenLocalStorage] =
    useLocalStorageState<string | undefined>("authToken", {
      defaultValue: undefined,
    });
  const updateAuthToken = (token: string) => {
    setAuthTokenLocalStorage(token);
  };
  const removeAuthTokenLocalStorage = () => {
    setAuthTokenLocalStorage(undefined);
  };

  return {
    authTokenLocalStorage,
    updateAuthToken,
    removeAuthTokenLocalStorage,
  };
};
