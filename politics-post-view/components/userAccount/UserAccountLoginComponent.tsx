"use client";

import { FC } from "react";
import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { toast } from "@heroui/react";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { ErrorType } from "@/graphql/gen/enums";
import { LoginByGoogleDocument } from "@/graphql/gen/graphql";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { getErrorCodeFromGraphQLError } from "@/util/apiUtil";

export const UserAccountLoginComponent: FC = () => {
  const [loginByGoogle, { loading: loginByGoogleLoading }] = useMutation(
    LoginByGoogleDocument,
  );
  const { updateAuthInfo } = useAuthManagement();

  const onAuthGoogle = async (authCode: string) => {
    try {
      const authResult = await loginByGoogle({
        variables: { authCode },
      });
      const accountData = authResult?.data?.loginByGoogle;
      const accountError = authResult?.error;

      if (CombinedGraphQLErrors.is(accountError)) {
        const errorCode = getErrorCodeFromGraphQLError(accountError.errors);
        if (errorCode === ErrorType.NotFound) {
          toast.danger("アカウントが未登録です。");
        } else {
          toast.danger("認証時にエラーが発生しました。");
        }
      } else if (accountError) {
        toast.danger("認証時にエラーが発生しました。");
      } else if (accountData) {
        updateAuthInfo(accountData);
        window.location.href = TOP_PAGE_PATH;
      }
    } catch (e) {
      toast.danger("登録時にエラーが発生しました。");
    }
  };

  return (
    <AuthGoogleComponent
      onAuthGoogle={onAuthGoogle}
      disabledFlag={loginByGoogleLoading}
    />
  );
};
