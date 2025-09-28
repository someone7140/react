"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { LoginByGoogleAuthDocument } from "@/graphql/gen/graphql";
import { useApiManagement } from "@/hooks/useApiManagement";
import { useAppDispatch } from "@/store/reduxStore";
import { updateAuthToken } from "@/store/slice/authStorageSlice";
import { updateUserAccount } from "@/store/slice/userAccountSlice";

export const UserAccountLoginComponent: FC = () => {
  const router = useRouter();
  const { getErrorCodeFromGraphQLError } = useApiManagement();
  const dispatch = useAppDispatch();

  const [loginByGoogleAuth, { loading }] = useMutation(
    LoginByGoogleAuthDocument
  );

  const onAuthGoogle = async (authCode: string) => {
    const result = await loginByGoogleAuth({
      variables: { authCode: authCode },
    });
    const res = result?.data?.loginByGoogleAuth;
    if (res) {
      // ユーザー情報をグローバルstateに格納
      dispatch(
        updateUserAccount({
          token: res.token,
          userSettingId: res.userSettingId,
          name: res.name,
          imageUrl: res.imageUrl,
        })
      );
      dispatch(updateAuthToken(res.token));
      toast.success("ログインしました");
      router.push(TOP_PAGE_PATH);
    } else if (result.error) {
      if (CombinedGraphQLErrors.is(result.error)) {
        const errorCode = getErrorCodeFromGraphQLError(result.error.errors);
        if (errorCode === 404) {
          toast.error("未登録のGoogleアカウントです");
          return;
        }
      }
      toast.error("システムエラーが発生しました");
    }
  };

  return (
    <AuthGoogleComponent onAuthGoogle={onAuthGoogle} disabledFlag={loading} />
  );
};
