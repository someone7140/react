"use client";

import { useLocalStorageState } from "ahooks";

export const useAuthManagement = () => {
  const { authTokenLocalStorage } = useAuthTokenLocalStorage();

  return { authTokenLocalStorage };
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
  };
};
