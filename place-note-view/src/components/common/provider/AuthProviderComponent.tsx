"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ConnectError } from "@bufbuild/connect";
import { getUserAccountFromAuthToken } from "@/gen/placeNote-UserAccountService_connectquery";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";

type Props = {
  children: ReactNode;
};

export const AuthProviderComponent: FC<Props> = ({ children }) => {
  const [displayFlag, setDisplayFlag] = useState<boolean>(false);
  const authStore = useAuthStore();
  const { authToken, removeAuthToken } = useAuthTokenLocalStorage();
  const { queryFn: getUserAccountFromAuthTokenFn } =
    getUserAccountFromAuthToken.useQuery({});

  const { refetch: getUserAccountFromAuthTokenRefetch, isError } = useQuery<
    void,
    ConnectError
  >(
    ["authByToken"],
    async () => {
      const result = await getUserAccountFromAuthTokenFn();
      authStore.setUserAccount(result);
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: 0,
    }
  );

  useEffect(() => {
    if (!displayFlag) {
      // localStorageにtokenがあってグローバルstoreにユーザアカウントの情報がない場合
      if (authToken && !authStore.userAccount) {
        getUserAccountFromAuthTokenRefetch();
      }
      setDisplayFlag(true);
    }
  }, [authStore, authToken, displayFlag, getUserAccountFromAuthTokenRefetch]);

  useEffect(() => {
    if (isError) {
      // removeAuthToken();
    }
  }, [isError, removeAuthToken]);

  return <>{displayFlag && children}</>;
};
