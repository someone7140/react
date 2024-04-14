"use client";

import { useState } from "react";
import { useAsyncEffect } from "ahooks";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { useGetUserFromAuthHeaderLazyQuery } from "@/query/graphqlGen/graphql";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const authStore = useAuthStore();
  const { authToken } = useAuthTokenLocalStorage();
  const [getUserFromAuthHeader, { loading }] =
    useGetUserFromAuthHeaderLazyQuery();
  const { setAuthInfo, removeAuthInfo } = useAuthManagement();
  const [isAuthProcessEnd, setIsAuthProcessEnd] = useState<boolean>(false);

  useAsyncEffect(async () => {
    if (!isAuthProcessEnd) {
      if (authToken) {
        if (!authStore.userAccount) {
          const response = await getUserFromAuthHeader();
          if (response.data?.getUserFromAuthHeader) {
            setAuthInfo(response.data?.getUserFromAuthHeader);
          } else {
            removeAuthInfo();
          }
        }
      } else {
        removeAuthInfo();
      }
      setIsAuthProcessEnd(true);
    }
  }, [authToken]);

  return (
    <>
      {!loading && isAuthProcessEnd && children}
      {(loading || !isAuthProcessEnd) && <LoadingSpinner />}
    </>
  );
}
