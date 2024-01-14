"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";
import {
  VerifyAuthTokenRequest,
  VerifyAuthTokenResponse,
} from "@/restHandler/verifyAuthToken";
import { RestRequestType } from "@/restHandler/common/commonRestType";
import { verifyAuthTokenDocument } from "@/query/rest/restQuery";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const effectRan = useRef(false);
  const authStore = useAuthStore();
  const { authToken, removeAuthToken } = useAuthTokenLocalStorage();
  const [verifyAuthToken, { loading }] = useMutation<VerifyAuthTokenResponse>(
    verifyAuthTokenDocument
  );

  useEffect(() => {
    const authExec = async () => {
      if (authToken) {
        try {
          const verifyAuthTokenRequest: RestRequestType<VerifyAuthTokenRequest> =
            {
              input: {
                authToken,
              },
            };
          const response = await verifyAuthToken({
            variables: verifyAuthTokenRequest,
          });
          if (response.data?.verifyAuthToken) {
            authStore.setUserAccount(response.data.verifyAuthToken);
          }
        } catch (e) {
          removeAuthToken();
        }
      } else {
        authStore.removeUserAccount();
      }
    };
    if (!authStore.userAccount && !effectRan.current) {
      authExec();
    }

    return () => {
      effectRan.current = true;
    };
  }, [authToken, authStore, verifyAuthToken, removeAuthToken]);

  return (
    <>
      {!loading && effectRan.current && children}
      {(loading || !effectRan.current) && <LoadingSpinner />}
    </>
  );
}
