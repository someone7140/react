"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { ApolloError } from "@apollo/client";
import { toast } from "sonner";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { useLoginByGoogleAuthMutation } from "@/graphql/gen/graphql";
import { useApiManagement } from "@/hooks/useApiManagement";
import { useAppDispatch } from "@/store/reduxStore";
import { updateUserAccount } from "@/store/slice/userAccountSlice";
import { updateAuthToken } from "@/store/slice/authStorageSlice";

export const UserAccountLoginComponent: FC = () => {
  const router = useRouter();
  const { getErrorCodeFromGraphQLError } = useApiManagement();
  const dispatch = useAppDispatch();

  const [loginByGoogleAuth, { loading }] = useLoginByGoogleAuthMutation();

  const onAuthGoogle = async (authCode: string) => {
    try {
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
      }
    } catch (e) {
      if (e instanceof ApolloError) {
        const errorCode = getErrorCodeFromGraphQLError(e.graphQLErrors);
        if (errorCode === 403) {
          toast.error("既に登録済みのユーザーです");
        } else {
          toast.error("システムエラーが発生しました");
        }
      }
    }
  };

  return (
    <AuthGoogleComponent onAuthGoogle={onAuthGoogle} disabledFlag={loading} />
  );
};
