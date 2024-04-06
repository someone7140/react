"use client";

import { useEffect, useRef, useState } from "react";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { useGetUserFromAuthHeaderLazyQuery } from "@/query/graphqlGen/graphql";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const effectRan = useRef(false);
  const authStore = useAuthStore();
  const { authToken } = useAuthTokenLocalStorage();
  const [getUserFromAuthHeader, { loading }] =
    useGetUserFromAuthHeaderLazyQuery();
  const { setAuthInfo, removeAuthInfo } = useAuthManagement();
  const [isAuthProcessEnd, setIsAuthProcessEnd] = useState<boolean>(false);

  useEffect(() => {
    const authExec = async () => {
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
    };
    if (!authStore.userAccount && !effectRan.current) {
      authExec();
    }

    return () => {
      effectRan.current = true;
    };
  }, [
    authToken,
    authStore,
    getUserFromAuthHeader,
    removeAuthInfo,
    setAuthInfo,
  ]);

  return (
    <>
      {!loading && isAuthProcessEnd && children}
      {(loading || !isAuthProcessEnd) && <LoadingSpinner />}
    </>
  );
}
