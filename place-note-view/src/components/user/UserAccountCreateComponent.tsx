"use client";

import React, { FC, useState } from "react";

import { Code, ConnectError } from "@bufbuild/connect";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import {
  UserAccountInputComponent,
  UserAccountRegisterForm,
} from "@/components/user/UserAccountInputComponent";
import { registerUserAccount } from "@/gen/placeNoteUserAccountService-UserAccountService_connectquery";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";
import { AuthState } from "@/type/AuthType";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";

type Props = {
  authState: AuthState;
};

export const UserAccountCreateComponent: FC<Props> = ({ authState }) => {
  const router = useRouter();
  const { updateAuthToken } = useAuthTokenLocalStorage();
  const authStore = useAuthStore();
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

  const { mutate: registerUserMutate, isPending: registerUserLoading } =
    useMutation<void, ConnectError, UserAccountRegisterForm, unknown>({
      mutationFn: async (formValues: UserAccountRegisterForm) => {
        setRegisterErrorMsg(undefined);
        const response = await registerUserMutationFn({
          authToken: authState.token,
          authMethod: authState.authMethod,
          userSettingId: formValues.userId,
          name: formValues.name,
        });
        // ユーザ情報を保存
        updateAuthToken(response.token);
        authStore.setUserAccount(response);
        router.push("/");
      },
      onError: (err) => {
        if (registerUserMutationOnError) {
          registerUserMutationOnError(err);
        }
      },
    });

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
