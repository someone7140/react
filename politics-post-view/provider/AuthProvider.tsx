"use client";

import { useState } from "react";
import { useAsyncEffect } from "ahooks";
import { useQuery } from "@apollo/client/react";
import { Spinner } from "@heroui/react";

import { GetUserInfoFromAuthHeaderDocument } from "@/graphql/gen/graphql";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const { refetch } = useQuery(GetUserInfoFromAuthHeaderDocument, {
    fetchPolicy: "network-only",
    skip: true,
  });
  const { userAccount, authTokenLocalStorage, updateAuthInfo, removeAuthInfo } =
    useAuthManagement();
  const [isAuthProcessEnd, setIsAuthProcessEnd] = useState<boolean>(false);

  useAsyncEffect(async () => {
    if (!isAuthProcessEnd) {
      if (authTokenLocalStorage) {
        if (!userAccount) {
          const response = await refetch();
          if (response.data?.getUserInfoFromAuthHeader) {
            updateAuthInfo(response.data?.getUserInfoFromAuthHeader);
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

  if (!isAuthProcessEnd) {
    return (
      <div className="flex justify-center py-4">
        <Spinner size="xl" />
      </div>
    );
  }

  return <>{children}</>;
}
