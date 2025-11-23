"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

import {
  UserAccountInputComponent,
  UserAccountInputFormType,
} from "./input/UserAccountInputComponent";
import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  AddUserAccountByGoogleAuthDocument,
  GetUserAccountRegisterTokenFromGoogleAuthCodeDocument,
} from "@/graphql/gen/graphql";
import { useApiManagement } from "@/hooks/useApiManagement";
import { useAppDispatch } from "@/store/reduxStore";
import { updateUserAccount } from "@/store/slice/userAccountSlice";
import { updateAuthToken } from "@/store/slice/authStorageSlice";

export const UserAccountRegisterComponent: FC = () => {
  const router = useRouter();
  const { getErrorCodeFromGraphQLError } = useApiManagement();
  const dispatch = useAppDispatch();

  const [googleAuthToken, setGoogleAuthToken] = useState<string | undefined>(
    undefined
  );
  const { refetch: refetchRegisterToken } = useQuery(
    GetUserAccountRegisterTokenFromGoogleAuthCodeDocument,
    {
      variables: { authCode: "" },
      fetchPolicy: "network-only",
      skip: true,
    }
  );
  const [addAccountUserByGoogle, { loading: addAccountUserByGoogleLoading }] =
    useMutation(AddUserAccountByGoogleAuthDocument);

  const onAuthGoogle = async (authCode: string) => {
    try {
      const result = await refetchRegisterToken({ authCode: authCode });
      const token = result?.data?.getUserAccountRegisterTokenFromGoogleAuthCode;
      if (token) {
        setGoogleAuthToken(token);
      }
    } catch (e) {
      if (CombinedGraphQLErrors.is(e)) {
        const errorCode = getErrorCodeFromGraphQLError(e.errors);
        if (errorCode === 403) {
          toast.error("既に登録済みのユーザーです");
          return;
        }
      }
      toast.error("登録時にエラーが発生しました");
    }
  };

  const execRegister = async (input: UserAccountInputFormType) => {
    const result = await addAccountUserByGoogle({
      variables: {
        registerToken: googleAuthToken ?? "",
        userSettingId: input.userSettingId,
        name: input.name,
      },
    });

    if (result.error) {
      if (CombinedGraphQLErrors.is(result.error)) {
        const errorCode = getErrorCodeFromGraphQLError(result.error.errors);
        if (errorCode === 403) {
          toast.error("既に登録済みのユーザーです");
          return;
        }
      }
      toast.error("システムエラーが発生しました");
    } else if (result.data?.addUserAccountByGoogleAuth) {
      const userData = result.data.addUserAccountByGoogleAuth;
      // ユーザー情報をグローバルstateに格納
      dispatch(
        updateUserAccount({
          token: userData.token,
          userSettingId: userData.userSettingId,
          name: userData.name,
          imageUrl: userData.imageUrl,
        })
      );
      dispatch(updateAuthToken(userData.token));
      toast.success("ユーザー登録しました");
      router.push(TOP_PAGE_PATH);
    }
  };

  return (
    <>
      {!googleAuthToken && (
        <AuthGoogleComponent onAuthGoogle={onAuthGoogle} disabledFlag={false} />
      )}
      {googleAuthToken && (
        <UserAccountInputComponent
          onSubmit={execRegister}
          disabled={addAccountUserByGoogleLoading}
        />
      )}
    </>
  );
};
