"use client";

import React, { FC, useState } from "react";
import { toast } from "react-toastify";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import {
  UserAccountInputComponent,
  UserAccountInputFormType,
} from "@/components/userAccount/input/UserAccountInputComponent";
import { useGoogleAuthCodeVerifyMutation } from "@/graphql/gen/graphql";

export const UserAccountRegisterComponent: FC = () => {
  const [googleAuthCodeVerify, { loading }] = useGoogleAuthCodeVerifyMutation();
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
    console.log(formData);
  };

  return (
    <>
      <UserAccountInputComponent execSubmit={execSubmit} />
      {/*
      {!googleAuthToken && (
        <AuthGoogleComponent
          onAuthGoogle={onAuthGoogle}
          disabledFlag={loading}
        />
      )}
      {googleAuthToken && <>入力</>}
     */}
    </>
  );
};
