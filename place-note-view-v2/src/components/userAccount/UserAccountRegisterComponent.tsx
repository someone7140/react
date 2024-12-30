"use client";

import React, { FC, useState } from "react";
import { toast } from "react-toastify";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  UserAccountInputComponent,
  UserAccountInputFormType,
} from "@/components/userAccount/input/UserAccountInputComponent";
import {
  useAddAccountUserByGoogleMutation,
  useGoogleAuthCodeVerifyMutation,
} from "@/graphql/gen/graphql";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export const UserAccountRegisterComponent: FC = () => {
  const [addAccountUserByGoogle, { loading: addAccountUserByGoogleLoading }] =
    useAddAccountUserByGoogleMutation();
  const [googleAuthCodeVerify, { loading: googleAuthCodeVerifyLoading }] =
    useGoogleAuthCodeVerifyMutation();
  const { updateAuthInfo } = useAuthManagement();
  const [googleAuthToken, setGoogleAuthToken] = useState<string | undefined>(
    undefined
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
        file: formData.imageFile ?? null,
      },
    });

    const accountData = result.data?.addAccountUserByGoogle;
    if (result.errors || !accountData) {
      toast.error(
        "登録に失敗しました。すでに登録済みのユーザIDである可能性があります"
      );
    } else {
      updateAuthInfo(accountData);
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
        />
      )}
    </>
  );
};
