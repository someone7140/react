"use client";

import React, { FC } from "react";
import { z } from "zod";

import {
  UserAccountInputComponent,
  userAccountInputFormSchema,
} from "@/components/feature/userAccount/input/UserAccountInputComponent";
import { toast } from "@/components/ui/use-toast";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import {
  AccountUserResponse,
  useEditAccountUserMutation,
} from "@/query/graphqlGen/graphql";
import { toastStyle } from "@/styles/CommonStyle";

type Props = {
  userAccount: AccountUserResponse;
};

export const AuthUserAccountEditComponent: FC<Props> = ({ userAccount }) => {
  const { setAuthInfo } = useAuthManagement();
  const [editAccountUserFromGoogle, { loading: loadingEditAccountUser }] =
    useEditAccountUserMutation();

  const submitFunc = async (
    data: z.infer<typeof userAccountInputFormSchema>
  ) => {
    const displayErrorToast = () => {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: (
          <>
            編集に失敗しました。変更されたユーザIDが重複している可能性があります。
            <br />
            再度編集登録してエラーが発生する場合はログインからやり直しをお願いします。
          </>
        ),
      });
    };

    try {
      const response = await editAccountUserFromGoogle({
        variables: {
          userSettingId: data.userSettingId,
          name: data.userName,
        },
      });

      const editResult = response?.data?.editAccountUser;
      if (response.errors || !editResult) {
        displayErrorToast();
      } else {
        setAuthInfo(editResult);
        toast({
          className: `${toastStyle({ textColor: "black" })}`,
          variant: "default",
          description: "ユーザ情報を編集しました。",
        });
      }
    } catch (e) {
      displayErrorToast();
    }
  };

  return (
    <div>
      <div className="mb-3">ユーザー編集</div>
      <UserAccountInputComponent
        submitFunc={submitFunc}
        disabledFlag={loadingEditAccountUser}
        userAccount={userAccount}
      />
    </div>
  );
};
