"use client";

import React, { FC, useState } from "react";
import { ApolloError } from "@apollo/client";
import { toast } from "sonner";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { useGetUserAccountRegisterTokenFromGoogleAuthCodeQuery } from "@/graphql/gen/graphql";
import { useApiManagement } from "@/hooks/useApiManagement";

export const UserAccountRegisterComponent: FC = () => {
  const { getErrorCodeFromGraphQLError } = useApiManagement();

  const [googleAuthToken, setGoogleAuthToken] = useState<string | undefined>(
    undefined
  );
  const { refetch: refetchRegisterToken } =
    useGetUserAccountRegisterTokenFromGoogleAuthCodeQuery({
      fetchPolicy: "network-only",
      skip: true,
    });

  const onAuthGoogle = async (authCode: string) => {
    try {
      const data = await refetchRegisterToken({ authCode: authCode });
    } catch (e) {
      if (e instanceof ApolloError) {
        const errorCode = getErrorCodeFromGraphQLError(e);
        if (errorCode === 403) {
          toast.error("既に登録済みのユーザーです");
        } else {
          toast.error("システムエラーが発生しました");
        }
      }
    }
  };

  return (
    <>
      {!googleAuthToken && (
        <AuthGoogleComponent onAuthGoogle={onAuthGoogle} disabledFlag={false} />
      )}
    </>
  );
};
