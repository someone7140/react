"use client";

import React, { FC } from "react";
import { toast } from "react-toastify";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { useLoginByGoogleAuthCodeMutation } from "@/graphql/gen/graphql";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export const UserAccountLoginComponent: FC = () => {
  const [loginGoogleAuthCode, { loading }] = useLoginByGoogleAuthCodeMutation();
  const { updateAuthInfo } = useAuthManagement();

  const onAuthGoogle = async (authCode: string) => {
    const displayErrorToast = () => {
      toast.error("ログインに失敗しました");
    };

    try {
      const authResult = await loginGoogleAuthCode({
        variables: { authCode },
      });
      const accountData = authResult?.data?.loginByGoogleAuthCode;
      if (authResult.errors || !accountData) {
        displayErrorToast();
      } else {
        updateAuthInfo(accountData);
        window.location.href = "/";
      }
    } catch (e) {
      displayErrorToast();
    }
  };

  return (
    <AuthGoogleComponent onAuthGoogle={onAuthGoogle} disabledFlag={loading} />
  );
};
