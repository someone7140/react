"use client";

import React, { FC, useState } from "react";

import { z } from "zod";
import { useMutation } from "@apollo/client";

import { AuthGoogleComponent } from "@/components/feature/auth/AuthGoogleComponent";
import {
  UserAccountInputComponent,
  userAccountInputFormSchema,
} from "@/components/feature/userAccount/UserAccountInputComponent";
import { useToast } from "@/components/ui/use-toast";
import { verifyGoogleCodeCheckMutation } from "@/query/rest/restQuery";
import {
  VerifyGoogleCodeCheckRequest,
  VerifyGoogleCodeCheckResponseData,
} from "@/restHandler/verifyGoogleCodeCheckPostHandler";
import { toastStyle } from "@/styles/CommonStyle";
import { RestRequestType } from "@/restHandler/common/restRequestType";

export const AuthUserAccountForRegisterComponent: FC = () => {
  const { toast } = useToast();

  const [verifyGoogleCodeCheck, { loading }] =
    useMutation<VerifyGoogleCodeCheckResponseData>(
      verifyGoogleCodeCheckMutation
    );
  const [googleAuthToken, setGoogleAuthToken] = useState<string | undefined>(
    undefined
  );

  const onAuthGoogle = async (authCode: string) => {
    const verifyGoogleCodeCheckRequest: RestRequestType<VerifyGoogleCodeCheckRequest> =
      {
        input: {
          authCode,
        },
      };
    const checkResult = await verifyGoogleCodeCheck({
      variables: verifyGoogleCodeCheckRequest,
    });
    if (checkResult.errors || !checkResult.data) {
    } else {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description:
          "認証失敗しました。登録済みのアカウントの可能性があります。",
      });
    }
  };

  const submitFunc = (data: z.infer<typeof userAccountInputFormSchema>) => {
    console.log(data);
  };

  return (
    <div>
      {!googleAuthToken && (
        <AuthGoogleComponent
          onAuthGoogle={onAuthGoogle}
          disabledFlag={loading}
        />
      )}
      {googleAuthToken && <UserAccountInputComponent submitFunc={submitFunc} />}
    </div>
  );
};
