"use client";

import { useState } from "react";
import { useAsyncEffect } from "ahooks";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { Spinner } from "@heroui/react";

import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { GetUserInfoFromAuthHeaderDocument } from "@/graphql/gen/graphql";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const router = useRouter();
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
          try {
            const response = await refetch();
            if (response.data?.getUserInfoFromAuthHeader) {
              updateAuthInfo(response.data?.getUserInfoFromAuthHeader);
            } else {
              removeAuthInfo();
            }
          } catch (e) {
            removeAuthInfo();
            router.push(TOP_PAGE_PATH);
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
