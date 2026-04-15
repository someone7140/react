"use client";

import { FC, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { toast } from "@heroui/react";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import {
  GetUserAccountRegisterTokenFromGoogleAuthCodeDocument,
  UserAccountRegisterTokenFromGoogleResponse,
} from "@/graphql/gen/graphql";

export const UserAccountRegisterComponent: FC = () => {
  const { refetch } = useQuery(
    GetUserAccountRegisterTokenFromGoogleAuthCodeDocument,
    {
      variables: { authCode: "" },
      fetchPolicy: "network-only",
      skip: true,
    },
  );
  const [googleAuthToken, setGoogleAuthToken] = useState<
    UserAccountRegisterTokenFromGoogleResponse | undefined
  >(undefined);

  const onAuthGoogle = async (authCode: string) => {
    const displayErrorToast = () => {
      toast.danger(
        "エラーが発生しました。すでに登録済みのアカウントである可能性があります。",
      );
    };

    try {
      const authResult = await refetch({
        authCode,
      });
      const accountData =
        authResult?.data?.getUserAccountRegisterTokenFromGoogleAuthCode;
      if (authResult.error || !accountData) {
        displayErrorToast();
      } else {
        setGoogleAuthToken(accountData);
      }
    } catch (e) {
      displayErrorToast();
    }
  };

  return (
    <>
      {!googleAuthToken && <AuthGoogleComponent onAuthGoogle={onAuthGoogle} />}
      {googleAuthToken && <>input</>}
    </>
  );
};
