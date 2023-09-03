"use client";

import React, { FC, useState } from "react";

import { Code, ConnectError } from "@bufbuild/connect";
import { useMutation } from "@tanstack/react-query";

import {
  UserAccountInputComponent,
  UserAccountRegisterForm,
} from "@/components/user/UserAccountInputComponent";
import { registerUserAccount } from "@/gen/placeNote-UserAccountService_connectquery";
import { AuthState } from "@/type/AuthType";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";

type Props = {
  authState: AuthState;
};

export const UserAccountCreateComponent: FC<Props> = ({ authState }) => {
  const [registerErrorMsg, setRegisterErrorMsg] = useState<string | undefined>(
    undefined
  );

  const {
    mutationFn: registerUserMutationFn,
    onError: registerUserMutationOnError,
  } = registerUserAccount.useMutation({
    onError: (err) => {
      if (err.code === Code.AlreadyExists) {
        setRegisterErrorMsg("すでに登録済みのユーザIDが入力されています");
      } else if (err.code === Code.Unauthenticated) {
        setRegisterErrorMsg(
          "認証に失敗しました、再度初めから操作を行ってください"
        );
      } else {
        setRegisterErrorMsg("登録時にエラーが発生しました");
      }
    },
  });

  const { mutate: registerUserMutate, isLoading: registerUserLoading } =
    useMutation<void, ConnectError, UserAccountRegisterForm, unknown>(
      async (formValues: UserAccountRegisterForm) => {
        setRegisterErrorMsg(undefined);
        const response = await registerUserMutationFn({
          authToken: authState.token,
          authMethod: authState.authMethod,
          userSettingId: formValues.userId,
          name: formValues.name,
        });
        console.log(response);
      },
      {
        onError: (err) => {
          if (registerUserMutationOnError) {
            registerUserMutationOnError(err);
          }
        },
      }
    );

  return (
    <div>
      <div className={centerHorizonContainerStyle()}>ユーザ登録</div>
      <UserAccountInputComponent
        submitFunc={registerUserMutate}
        disabled={registerUserLoading}
        errMsg={registerErrorMsg}
      />
    </div>
  );
};
