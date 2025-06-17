"use client";

import React, { FC, useEffect } from "react";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

import {
  UserAccountInputComponent,
  UserAccountInputFormValues,
} from "./input/UserAccountInputComponent";
import {
  TOP_PAGE_PATH,
  USER_ACCOUNT_REGISTER_PAGE_PATH,
} from "@/constants/MenuPathConstants";
import {
  useCreateUserAccountMutation,
  useGetUserRegisterTokenQuery,
} from "@/graphql/gen/graphql";
import { useApiManagement } from "@/hooks/useApiManagement";
import { useAuthManagement } from "@/hooks/useAuthManagement";

type Props = {
  authCode: string;
};

export const UserAccountRegisterComponent: FC<Props> = ({ authCode }) => {
  const [{ data: tokenData, fetching: tokenFetching, error: tokenError }] =
    useGetUserRegisterTokenQuery({
      variables: { authCode },
    });
  const [createUserAccountMutationResult, createUserAccountMutation] =
    useCreateUserAccountMutation();
  const { getErrorCodeFromGraphQLError } = useApiManagement();
  const router = useRouter();
  const { updateUserAccountState } = useAuthManagement();

  const submitRegisterUser = async (formValues: UserAccountInputFormValues) => {
    const result = await createUserAccountMutation({
      authToken: tokenData?.getUserRegisterToken?.token ?? "",
      userSettingId: formValues.userSettingId,
      userName: formValues.userName,
    });
    if (!result?.data?.createUserAccount || result.error) {
      const errorCode = getErrorCodeFromGraphQLError(result.error);
      notifications.show({
        id: "submitRegister-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "ユーザー登録エラー",
        message:
          errorCode == 400
            ? "ユーザーIDが重複しています。再度入力の上登録お願いします。"
            : errorCode == 403
            ? "登録済みのLINEアカウントです。ログインから認証してください。"
            : "会員登録でエラーが起きました。",
        color: "red",
        loading: false,
      });
    } else {
      router.push(`${TOP_PAGE_PATH}`);
      updateUserAccountState(result.data.createUserAccount);
      notifications.show({
        id: "submitRegister-success",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "ユーザー登録",
        message: "ユーザー登録しました。",
        color: "green",
        loading: false,
      });
    }
  };

  useEffect(() => {
    if (tokenError) {
      const errorCode = getErrorCodeFromGraphQLError(tokenError);
      notifications.show({
        id: "authCode-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "認証情報取得エラー",
        message:
          errorCode === 403
            ? "登録済みのLINEアカウントです。ログインから認証してください。"
            : "LINE認証情報の取得に失敗しました。再度の認証をお願いします。",
        color: "red",
        loading: false,
      });
      router.push(`${USER_ACCOUNT_REGISTER_PAGE_PATH}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenError]);

  if (tokenFetching) {
    return <Loader size={30} />;
  }

  return (
    <>
      {tokenData?.getUserRegisterToken && (
        <UserAccountInputComponent
          submitDisabled={createUserAccountMutationResult.fetching}
          submitUser={submitRegisterUser}
          defaultUserName={tokenData.getUserRegisterToken.lineName}
        />
      )}
    </>
  );
};
