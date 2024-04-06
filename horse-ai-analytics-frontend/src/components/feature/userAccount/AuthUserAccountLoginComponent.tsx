"use client";

import React, { FC } from "react";

import { AuthGoogleComponent } from "@/components/feature/auth/AuthGoogleComponent";
import { useToast } from "@/components/ui/use-toast";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { toastStyle } from "@/styles/CommonStyle";
import { useLoginGoogleAuthCodeMutation } from "@/query/graphqlGen/graphql";

export const AuthUserAccountLoginComponent: FC = () => {
  const { toast } = useToast();

  const [loginGoogleAuthCode, { loading }] = useLoginGoogleAuthCodeMutation();
  const { setAuthInfo } = useAuthManagement();

  const onAuthGoogle = async (authCode: string) => {
    const displayErrorToast = () => {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "認証失敗しました。未登録のアカウントの可能性があります。",
      });
    };

    try {
      const authResult = await loginGoogleAuthCode({
        variables: { authCode },
      });
      const accountData = authResult?.data?.loginGoogleAuthCode;
      if (authResult.errors || !accountData) {
        displayErrorToast();
      } else {
        setAuthInfo(accountData);
        window.location.href = "/";
      }
    } catch (e) {
      displayErrorToast();
    }
  };

  return (
    <div>
      <div className="mb-3">ログイン</div>
      <AuthGoogleComponent onAuthGoogle={onAuthGoogle} disabledFlag={loading} />
    </div>
  );
};
