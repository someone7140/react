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
import { verifyGoogleCodeCheckMutationDocument } from "@/query/rest/restQuery";
import { RestRequestType } from "@/restHandler/common/restRequestType";
import {
  VerifyGoogleCodeCheckRequest,
  VerifyGoogleCodeCheckResponse,
} from "@/restHandler/verifyGoogleCodeCheckPostHandler";
import { toastStyle } from "@/styles/CommonStyle";

export const AuthUserAccountForRegisterComponent: FC = () => {
  const { toast } = useToast();

  const [verifyGoogleCodeCheck, { loading }] =
    useMutation<VerifyGoogleCodeCheckResponse>(
      verifyGoogleCodeCheckMutationDocument
    );
  const [googleAuthToken, setGoogleAuthToken] = useState<string | undefined>(
    undefined
  );

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
      const verifyGoogleCodeCheckRequest: RestRequestType<VerifyGoogleCodeCheckRequest> =
        {
          input: {
            authCode,
          },
        };
      const checkResult = await verifyGoogleCodeCheck({
        variables: verifyGoogleCodeCheckRequest,
      });

      const responseAuthToken =
        checkResult?.data?.verifyGoogleCodeCheck?.authToken;
      if (checkResult.errors || !responseAuthToken) {
        displayErrorToast();
      } else {
        console.log(responseAuthToken);
      }
    } catch (e) {
      displayErrorToast();
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
