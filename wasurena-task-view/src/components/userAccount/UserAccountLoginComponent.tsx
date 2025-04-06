"use client";

import React, { FC, useEffect } from "react";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { useGetRegisteredUserQuery } from "@/graphql/gen/graphql";
import { useApiManagement } from "@/hooks/useApiManagement";
import { useAuthManagement } from "@/hooks/useAuthManagement";

type Props = {
  authCode: string;
};

export const UserAccountLoginComponent: FC<Props> = ({ authCode }) => {
  const [{ data, fetching, error }] = useGetRegisteredUserQuery({
    variables: { authCode },
  });
  const { getErrorCodeFromGraphQLError } = useApiManagement();
  const router = useRouter();
  const { updateUserAccountState } = useAuthManagement();

  useEffect(() => {
    if (!fetching) {
      if (error) {
        const errorCode = getErrorCodeFromGraphQLError(error);
        notifications.show({
          id: "login-error",
          position: "top-center",
          withCloseButton: true,
          autoClose: 5000,
          title: "ログインエラー",
          message:
            errorCode == 404
              ? "ユーザーが見つかりませんでした。会員登録を行ってください。"
              : "処理エラーが起きました。再度お試しください。",
          color: "red",
          loading: false,
        });
        router.push(`${TOP_PAGE_PATH}`);
      } else if (data?.getRegisteredUser) {
        router.push(`${TOP_PAGE_PATH}`);
        updateUserAccountState(data.getRegisteredUser);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching]);

  if (fetching) {
    return <Loader size={30} />;
  }

  return <></>;
};
