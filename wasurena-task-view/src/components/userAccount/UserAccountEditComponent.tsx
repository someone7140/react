"use client";

import React, { FC } from "react";
import { notifications } from "@mantine/notifications";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import {
  UserAccountInputComponent,
  UserAccountInputFormValues,
} from "./input/UserAccountInputComponent";
import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { useUpdateUserAccountMutation } from "@/graphql/gen/graphql";
import {
  ErrorClassification,
  useApiManagement,
} from "@/hooks/useApiManagement";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export const UserAccountEditComponent: FC = ({}) => {
  const [userAccountState] = useAtom(userAccountAtom);
  const router = useRouter();
  const { updateUserAccountState } = useAuthManagement();
  const [updateUserAccountMutationResult, updateUserAccountMutation] =
    useUpdateUserAccountMutation();
  const { getErrorCodeFromGraphQLError } = useApiManagement();

  const submitEditUser = async (formValues: UserAccountInputFormValues) => {
    const result = await updateUserAccountMutation({
      userSettingId: formValues.userSettingId,
      userName: formValues.userName,
    });
    if (!result?.data?.updateUserAccount || result.error) {
      const errorCode = getErrorCodeFromGraphQLError(result.error);
      notifications.show({
        id: "submitEdit-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "ユーザー登録エラー",
        message:
          errorCode == ErrorClassification.BAD_REQUEST
            ? "ユーザーIDが重複しています。再度入力の上登録お願いします。"
            : "編集でエラーが起きました。",
        color: "red",
        loading: false,
      });
    } else {
      router.push(`${TOP_PAGE_PATH}`);
      updateUserAccountState(result.data.updateUserAccount);
      notifications.show({
        id: "submitEdit-success",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "ユーザー情報",
        message: "ユーザー情報を変更しました。",
        color: "green",
        loading: false,
      });
    }
  };

  return (
    <>
      <UserAccountInputComponent
        submitDisabled={updateUserAccountMutationResult.fetching}
        submitUser={submitEditUser}
        defaultUserName={userAccountState?.userName}
        defaultUserSettingId={userAccountState?.userSettingId}
      />
    </>
  );
};
