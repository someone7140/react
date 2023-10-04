"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectError } from "@bufbuild/connect";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { loginByGoogle } from "@/gen/placeNoteUserAccountService-UserAccountService_connectquery";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { errorMessageStyle } from "@/style/MessageStyle";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const AuthUserAccountLoginComponent: FC = () => {
  const router = useRouter();
  const [authGoogleErrorMsg, setAuthGoogleErrorMsg] = useState<
    string | undefined
  >(undefined);
  const { updateAuthToken } = useAuthTokenLocalStorage();
  const authStore = useAuthStore();

  const {
    mutationFn: loginByGoogleMutationFn,
    onError: loginByGoogleMutationOnError,
  } = loginByGoogle.useMutation({
    onError: (err) => {
      setAuthGoogleErrorMsg(
        "認証に失敗しました、ユーザー未登録の可能性があります"
      );
    },
  });

  const { mutate: loginByGoogleMutate, isLoading: loginByGoogleLoading } =
    useMutation<void, ConnectError, string, unknown>(
      async (authCode: string) => {
        const response = await loginByGoogleMutationFn({
          authCode,
        });
        // ユーザ情報を保存
        updateAuthToken(response.token);
        authStore.setUserAccount(response);
        toast("ログインしました");
        router.push("/");
      },
      {
        onError: (err) => {
          if (loginByGoogleMutationOnError) {
            loginByGoogleMutationOnError(err);
          }
        },
      }
    );

  return (
    <div>
      <div className="ml-4 mb-2">ログイン認証</div>
      <div>
        <AuthGoogleComponent
          onAuthGoogle={(authCode: string) => {
            loginByGoogleMutate(authCode);
          }}
          disabledFlag={loginByGoogleLoading}
        />
        {authGoogleErrorMsg && (
          <div className={`${errorMessageStyle()} mt-2`}>
            {authGoogleErrorMsg}
          </div>
        )}
      </div>
    </div>
  );
};
