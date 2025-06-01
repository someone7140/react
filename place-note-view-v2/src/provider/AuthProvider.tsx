"use client";

import { useState } from "react";
import { useAsyncEffect } from "ahooks";
import { useGetAccountUserByTokenLazyQuery } from "@/graphql/gen/graphql";
import { Spinner } from "@heroui/react";

import { useAuthManagement } from "@/hooks/useAuthManagement";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [getAccountUserByToken, { loading }] =
    useGetAccountUserByTokenLazyQuery();
  const { userAccount, authTokenLocalStorage, updateAuthInfo, removeAuthInfo } =
    useAuthManagement();
  const [isAuthProcessEnd, setIsAuthProcessEnd] = useState<boolean>(false);

  useAsyncEffect(async () => {
    if (!isAuthProcessEnd) {
      if (authTokenLocalStorage) {
        if (!userAccount) {
          const response = await getAccountUserByToken();
          if (response.data?.getAccountUserByToken) {
            updateAuthInfo(response.data?.getAccountUserByToken);
          } else {
            removeAuthInfo();
          }
        }
      } else {
        removeAuthInfo();
      }
      setIsAuthProcessEnd(true);
    }
  }, [authTokenLocalStorage]);

  return (
    <>
      {!loading && isAuthProcessEnd && children}
      {(loading || !isAuthProcessEnd) && <Spinner />}
    </>
  );
}
