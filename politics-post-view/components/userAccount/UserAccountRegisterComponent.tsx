"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CombinedGraphQLErrors } from "@apollo/client";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { toast } from "@heroui/react";

import {
  UserAccountInputComponent,
  UserAccountInputFormType,
} from "./input/UserAccountInputComponent";
import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  GetUserAccountRegisterTokenFromGoogleAuthCodeDocument,
  RegisterUserAccountFromGoogleDocument,
} from "@/graphql/gen/graphql";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { getErrorCodeFromGraphQLError } from "@/util/apiUtil";

export const UserAccountRegisterComponent: FC = () => {
  const router = useRouter();
  const { updateAuthInfo } = useAuthManagement();
  const [
    fetchDataRegisterToken,
    {
      loading: registerTokenLoading,
      data: registerTokenData,
      error: registerTokenError,
    },
  ] = useLazyQuery(GetUserAccountRegisterTokenFromGoogleAuthCodeDocument, {
    fetchPolicy: "network-only",
  });
  const [addAccountUserByGoogle, { loading: addAccountUserByGoogleLoading }] =
    useMutation(RegisterUserAccountFromGoogleDocument);

  const onAuthGoogle = async (authCode: string) => {
    fetchDataRegisterToken({
      variables: { authCode },
    });
  };

  const onSubmitRegister = async (form: UserAccountInputFormType) => {
    try {
      const authResult = await addAccountUserByGoogle({
        variables: {
          token:
            registerTokenData?.getUserAccountRegisterTokenFromGoogleAuthCode
              ?.token ?? "",
          name: form.name,
          userSettingId: form.userSettingId,
          urlList: form.urlList,
          detail: form.detail,
        },
      });
      const accountData = authResult?.data?.registerUserAccountFromGoogle;
      if (CombinedGraphQLErrors.is(authResult.error)) {
        const errorCode = getErrorCodeFromGraphQLError(authResult.error.errors);
        if (errorCode === "FORBIDDEN_ERROR") {
          toast.danger(
            "エラーが発生しました。IDがすでに登録済みである可能性があります。",
          );
        }
      } else if (accountData) {
        // ユーザー情報をグローバルstateに格納
        updateAuthInfo(accountData);
        router.push(TOP_PAGE_PATH);
        toast.success("ユーザー登録しました。");
      } else {
        toast.danger("登録時にエラーが発生しました。");
      }
    } catch (e) {
      toast.danger("登録時にエラーが発生しました。");
    }
  };

  useEffect(() => {
    if (CombinedGraphQLErrors.is(registerTokenError)) {
      const errorCode = getErrorCodeFromGraphQLError(registerTokenError.errors);
      if (errorCode === "FORBIDDEN_ERROR") {
        toast.danger("アカウントがすでに登録済みである可能性があります。");
      } else {
        toast.danger("認証時にエラーが発生しました。");
      }
    } else if (registerTokenError) {
      toast.danger("認証時にエラーが発生しました。");
    }
  }, [registerTokenError]);

  const tokenData =
    registerTokenData?.getUserAccountRegisterTokenFromGoogleAuthCode;
  return (
    <>
      {!tokenData && (
        <AuthGoogleComponent
          onAuthGoogle={onAuthGoogle}
          disabledFlag={registerTokenLoading}
        />
      )}
      {tokenData && (
        <UserAccountInputComponent
          execSubmit={onSubmitRegister}
          disabledFlag={addAccountUserByGoogleLoading}
          defaultValue={{
            userSettingId: "",
            name: tokenData.name ?? "",
            urlList: [],
          }}
        />
      )}
    </>
  );
};
