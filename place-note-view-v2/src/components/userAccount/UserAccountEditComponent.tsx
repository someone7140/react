"use client";

import React, { FC } from "react";
import { toast } from "react-toastify";

import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { UserAccountInputComponent } from "@/components/userAccount/input/UserAccountInputComponent";
import { useEditAccountUserMutation } from "@/graphql/gen/graphql";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import {
  UserAccountInputFormType,
  useUserAccountInputSessionStore,
} from "@/hooks/inputSessionStore/useUserAccountInputSessionStore";

export const UserAccountEditComponent: FC = () => {
  const { userAccount, updateAuthInfo } = useAuthManagement();
  const [editAccountUser, { loading: editAccountUserLoading }] =
    useEditAccountUserMutation();
  const { updateUserAccountInputSession } = useUserAccountInputSessionStore();

  const execSubmit = async (formData: UserAccountInputFormType) => {
    const result = await editAccountUser({
      variables: {
        userSettingId: formData.userSettingId,
        name: formData.name,
        file: formData.imageFile?.name ? formData.imageFile : null,
        detail: formData.detail,
        urlList: formData.urlList.filter((url) => !!url),
      },
    });

    const accountData = result.data?.editAccountUser;
    if (result.errors || !accountData) {
      toast.error(
        "変更に失敗しました。すでに登録済みのユーザIDである可能性があります"
      );
    } else {
      updateAuthInfo(accountData);
      updateUserAccountInputSession(undefined);
      window.location.href = TOP_PAGE_PATH;
    }
  };

  return (
    <UserAccountInputComponent
      execSubmit={execSubmit}
      disabledFlag={editAccountUserLoading}
      editUser={userAccount}
    />
  );
};
