"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

import { AuthGoogleComponent } from "@/components/feature/auth/AuthGoogleComponent";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";

import {
  LoginByGoogleRequest,
  LoginByGoogleResponse,
} from "@/restHandler/loginByGooglePostHandler";
import { loginByGoogleMutationDocument } from "@/query/rest/restQuery";
import { RestRequestType } from "@/restHandler/common/commonRestType";
import { toastStyle } from "@/styles/CommonStyle";

export const AuthUserAccountForLoginComponent: FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [loginByGoogle, { loading: loadingGoogleAuth }] =
    useMutation<LoginByGoogleResponse>(loginByGoogleMutationDocument);
  const authGlobalStore = useAuthStore();
  const authLocalStorage = useAuthTokenLocalStorage();

  const onAuthGoogle = async (authCode: string) => {
    const displayErrorToast = () => {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "認証失敗しました。未登録のアカウントの可能性があります。",
      });
    };

    try {
      const loginByGoogleRequest: RestRequestType<LoginByGoogleRequest> = {
        input: {
          authCode,
        },
      };
      const authResult = await loginByGoogle({
        variables: loginByGoogleRequest,
      });
      const accountData = authResult?.data?.loginByGoogle;
      if (authResult.errors || !accountData) {
        displayErrorToast();
      } else {
        authLocalStorage.updateAuthToken(accountData.authToken);
        authGlobalStore.setUserAccount({
          authToken: accountData.authToken,
          userSettingId: accountData.userSettingId,
          name: accountData.name,
          imageUrl: accountData.imageUrl,
        });
        toast({
          className: `${toastStyle({ textColor: "black" })}`,
          description: "ログインしました",
        });

        router.push("/");
      }
    } catch (e) {
      displayErrorToast();
    }
  };

  return (
    <div>
      <div className="mb-3">ログイン</div>
      <AuthGoogleComponent
        onAuthGoogle={onAuthGoogle}
        disabledFlag={loadingGoogleAuth}
      />
    </div>
  );
};
