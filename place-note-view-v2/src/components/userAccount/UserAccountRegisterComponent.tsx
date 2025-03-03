"use client";

import React, { FC, useState } from "react";
import { toast } from "react-toastify";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { UserAccountInputComponent } from "@/components/userAccount/input/UserAccountInputComponent";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  useAddAccountUserByGoogleMutation,
  useGoogleAuthCodeVerifyMutation,
} from "@/graphql/gen/graphql";
import {
  UserAccountInputFormType,
  useUserAccountInputSessionStore,
} from "@/hooks/inputSessionStore/useUserAccountInputSessionStore";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export const UserAccountRegisterComponent: FC = () => {
  const [addAccountUserByGoogle, { loading: addAccountUserByGoogleLoading }] =
    useAddAccountUserByGoogleMutation();
  const [googleAuthCodeVerify, { loading: googleAuthCodeVerifyLoading }] =
    useGoogleAuthCodeVerifyMutation();
  const { updateAuthInfo } = useAuthManagement();
  const { userAccountInputSession, updateUserAccountInputSession } =
    useUserAccountInputSessionStore();
  const [googleAuthToken, setGoogleAuthToken] = useState<string | undefined>(
    userAccountInputSession?.authToken
  );

  const onAuthGoogle = async (authCode: string) => {
    const displayErrorToast = () => {
      toast.error("すでに登録済みのアカウントである可能性があります");
    };

    try {
      const authResult = await googleAuthCodeVerify({
        variables: { authCode },
      });
      const accountData = authResult?.data?.googleAuthCodeVerify;
      if (authResult.errors || !accountData) {
        displayErrorToast();
      } else {
        setGoogleAuthToken(accountData.token);
      }
    } catch (e) {
      displayErrorToast();
    }
  };

  const execSubmit = async (formData: UserAccountInputFormType) => {
    const result = await addAccountUserByGoogle({
      variables: {
        authToken: googleAuthToken ?? "",
        userSettingId: formData.userSettingId,
        name: formData.name,
        file: formData.imageFile?.name ? formData.imageFile : null,
        detail: formData.detail,
        urlList: formData.urlList.filter((url) => !!url),
      },
    });

    const accountData = result.data?.addAccountUserByGoogle;
    if (result.errors || !accountData) {
      toast.error(
        "登録に失敗しました。すでに登録済みのユーザIDである可能性があります"
      );
    } else {
      updateAuthInfo(accountData);
      updateUserAccountInputSession(undefined);
      window.location.href = TOP_PAGE_PATH;
    }
  };

  return (
    <>
      {!googleAuthToken && (
        <AuthGoogleComponent
          onAuthGoogle={onAuthGoogle}
          disabledFlag={googleAuthCodeVerifyLoading}
        />
      )}
      {googleAuthToken && (
        <UserAccountInputComponent
          execSubmit={execSubmit}
          disabledFlag={addAccountUserByGoogleLoading}
          authToken={googleAuthToken}
        />
      )}
    </>
  );
};
