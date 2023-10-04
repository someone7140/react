"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ConnectError } from "@bufbuild/connect";
import { getUserAccountFromAuthToken } from "@/gen/placeNoteUserAccountService-UserAccountService_connectquery";
import { UserAccountResponse } from "@/gen/placeNoteUserAccountService_pb";
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
    UserAccountResponse,
    ConnectError
  >(
    ["authByToken"],
    async () => {
      return await getUserAccountFromAuthTokenFn();
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: 0,
    }
  );

  useEffect(() => {
    (async () => {
      if (!displayFlag) {
        // localStorageにtokenがあってグローバルstoreにユーザアカウントの情報がない場合
        if (authToken && !authStore.userAccount) {
          const result = await getUserAccountFromAuthTokenRefetch();
          if (result.data) {
            authStore.setUserAccount(result.data);
          }
        }
        setDisplayFlag(true);
      }
    })();
  }, [authStore, authToken, displayFlag, getUserAccountFromAuthTokenRefetch]);

  useEffect(() => {
    if (isError) {
      removeAuthToken();
    }
  }, [isError, removeAuthToken]);

  return <>{displayFlag && children}</>;
};
