"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useMutation } from "@apollo/client";

import { AuthGoogleComponent } from "@/components/feature/auth/AuthGoogleComponent";
import {
  UserAccountInputComponent,
  userAccountInputFormSchema,
} from "@/components/feature/userAccount/UserAccountInputComponent";

import { useToast } from "@/components/ui/use-toast";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import {
  addAccountUserByGmailPostMutationDocument,
  verifyGoogleCodeCheckMutationDocument,
} from "@/query/rest/restQuery";
import { RestRequestType } from "@/restHandler/common/commonRestType";
import {
  VerifyGoogleCodeCheckRequest,
  VerifyGoogleCodeCheckResponse,
} from "@/restHandler/verifyGoogleCodeCheckPostHandler";
import { toastStyle } from "@/styles/CommonStyle";
import {
  AddAccountUserByGmailPostRequest,
  AddAccountUserByGmailPostResponse,
} from "@/restHandler/addAccountUserByGmailPostHandler";

export const AuthUserAccountForRegisterComponent: FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [verifyGoogleCodeCheck, { loading: loadingVerify }] =
    useMutation<VerifyGoogleCodeCheckResponse>(
      verifyGoogleCodeCheckMutationDocument
    );
  const [addAccountUserByGmail, { loading: loadingRegister }] =
    useMutation<AddAccountUserByGmailPostResponse>(
      addAccountUserByGmailPostMutationDocument
    );
  const [googleAuthToken, setGoogleAuthToken] = useState<string | undefined>(
    undefined
  );
  const { setAuthInfo } = useAuthManagement();

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
      const addAccountUserByGmailRequest: RestRequestType<AddAccountUserByGmailPostRequest> =
        {
          input: {
            authToken: googleAuthToken ?? "",
            userSettingId: data.userSettingId,
            name: data.userName,
          },
        };
      const response = await addAccountUserByGmail({
        variables: addAccountUserByGmailRequest,
      });

      const authResult = response?.data?.addAccountUserByGmail;
      if (response.errors || !authResult) {
        displayErrorToast();
      } else {
        setAuthInfo({
          authToken: authResult.authToken,
          userSettingId: authResult.userSettingId,
          name: authResult.name,
          imageUrl: authResult.imageUrl,
        });
        window.location.href = "/";
      }
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
          disabledFlag={loadingVerify}
        />
      )}
      {googleAuthToken && (
        <UserAccountInputComponent
          submitFunc={submitFunc}
          disabled={loadingRegister}
        />
      )}
    </div>
  );
};
