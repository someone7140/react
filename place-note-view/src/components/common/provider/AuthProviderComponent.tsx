"use client";

import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUserAccountFromAuthToken } from "@/gen/placeNoteUserAccountService-UserAccountService_connectquery";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";
import { truncateSync } from "fs";

type Props = {
  children: ReactNode;
};

export const AuthProviderComponent: FC<Props> = ({ children }) => {
  const effectRan = useRef(false);

  const [noLoginFlag, setNoLoginFlag] = useState<boolean>(false);
  const [fetchFlag, setFetchFlag] = useState<boolean>(false);
  const authStore = useAuthStore();
  const { authToken, removeAuthToken } = useAuthTokenLocalStorage();
  const { data, isError } = useQuery({
    ...getUserAccountFromAuthToken.useQuery({}),
    retry: 0,
    enabled: fetchFlag,
  });

  useEffect(() => {
    if (!effectRan.current) {
      if (authToken && !authStore.userAccount) {
        setFetchFlag(true);
      } else {
        setNoLoginFlag(true);
      }
    }

    return () => {
      effectRan.current = true;
    };
  }, [authStore, authToken, setFetchFlag]);

  useEffect(() => {
    if (data && !authStore.userAccount) {
      authStore.setUserAccount(data);
    }
  }, [authStore, data]);

  useEffect(() => {
    if (isError) {
      // removeAuthToken();
      setNoLoginFlag(true);
    }
  }, [isError, removeAuthToken]);

  return <>{(noLoginFlag || authStore.userAccount) && children}</>;
};
