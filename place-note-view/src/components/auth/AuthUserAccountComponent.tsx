"use client";

import React, { FC, useState } from "react";
import { Code, ConnectError } from "@bufbuild/connect";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { authGoogleAccount } from "@/gen/placeNote-UserAccountService_connectquery";
import { AuthState } from "@/type/AuthType";
import { errorMessageStyle } from "@/style/MessageStyle";
import { useMutation } from "@tanstack/react-query";
import { AuthMethod } from "@/gen/placeNote_pb";

type Props = {
  setAuthState: (authCode: AuthState) => void;
};

export const AuthUserAccountComponent: FC<Props> = ({ setAuthState }) => {
  const [authGoogleErrorMsg, setAuthGoogleErrorMsg] = useState<
    string | undefined
  >(undefined);

  const {
    mutationFn: authGoogleAccountMutationFn,
    onError: authGoogleAccountMutationOnError,
  } = authGoogleAccount.useMutation({
    onError: (err) => {
      if (err.code === Code.AlreadyExists) {
        setAuthGoogleErrorMsg("すでに登録済みのアカウントです");
      } else {
        setAuthGoogleErrorMsg("認証に失敗しました、再度操作を行ってください");
      }
    },
  });

  const { mutate: authGoogleUserMutate, isLoading: authGoogleUserLoading } =
    useMutation<void, ConnectError, string, unknown>(
      async (authCode: string) => {
        const response = await authGoogleAccountMutationFn({
          authCode,
        });
        setAuthState({ token: response.token, authMethod: AuthMethod.GOOGLE });
      },
      {
        onError: (err) => {
          if (authGoogleAccountMutationOnError) {
            authGoogleAccountMutationOnError(err);
          }
        },
      }
    );

  return (
    <div className={`mr-20`}>
      <div className={`mb-2`}>ユーザ登録用の認証</div>
      <div className={`ml-2`}>
        <AuthGoogleComponent
          onAuthGoogle={(authCode: string) => {
            authGoogleUserMutate(authCode);
          }}
          disabledFlag={authGoogleUserLoading}
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
