"use client";

import React, { FC, useState } from "react";
import { z } from "zod";

import { AuthGoogleComponent } from "@/components/feature/auth/AuthGoogleComponent";
import {
  UserAccountInputComponent,
  userAccountInputFormSchema,
} from "@/components/feature/userAccount/UserAccountInputComponent";
import { toast } from "@/components/ui/use-toast";
import { useValidateGoogleAuthCodeMutation } from "@/query/graphqlGen/graphql";
import { toastStyle } from "@/styles/CommonStyle";

export const AuthUserAccountForRegisterComponent: FC = () => {
  const [googleAuthToken, setGoogleAuthToken] = useState<string | undefined>(
    undefined
  );
  const [validateGoogleAuthCode, { loading: loadingValidateGoogleAuthCode }] =
    useValidateGoogleAuthCodeMutation();

  const onAuthGoogle = async (authCode: string) => {
    const displayErrorToast = () => {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description:
          "認証失敗しました。登録済みのアカウントの可能性があります。",
      });
    };

    try {
      const validateResult = await validateGoogleAuthCode({
        variables: { authCode },
      });

      const responseAuthToken =
        validateResult?.data?.validateGoogleAuthCode.authToken;
      if (validateResult.errors || !responseAuthToken) {
        displayErrorToast();
      } else {
        setGoogleAuthToken(responseAuthToken);
      }
    } catch (e) {
      displayErrorToast();
    }
  };

  const submitFunc = async (
    data: z.infer<typeof userAccountInputFormSchema>
  ) => {
    const displayErrorToast = () => {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: (
          <>
            登録失敗しました。ユーザIDが重複している可能性があります。
            <br />
            再度登録してエラーが発生する場合は認証からやり直しをお願いします。
          </>
        ),
      });
    };

    try {
      console.log("aaaa");
    } catch (e) {
      displayErrorToast();
    }
  };

  return (
    <div>
      <div className="mb-3">ユーザー登録</div>
      {!googleAuthToken && (
        <AuthGoogleComponent
          onAuthGoogle={onAuthGoogle}
          disabledFlag={loadingValidateGoogleAuthCode}
        />
      )}
      {googleAuthToken && (
        <UserAccountInputComponent
          submitFunc={submitFunc}
          disabledFlag={false}
        />
      )}
    </div>
  );
};
