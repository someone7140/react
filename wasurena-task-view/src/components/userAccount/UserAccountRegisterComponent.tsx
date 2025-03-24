"use client";

import React, { FC, useEffect } from "react";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

import { USER_ACCOUNT_REGISTER_PAGE_PATH } from "@/constants/MenuPathConstants";
import { useGetUserRegisterTokenQuery } from "@/graphql/gen/graphql";

type Props = {
  authCode: string;
};

export const UserAccountRegisterComponent: FC<Props> = ({ authCode }) => {
  const [{ data, fetching, error }] = useGetUserRegisterTokenQuery({
    variables: { authCode },
  });
  const router = useRouter();

  useEffect(() => {
    if (error) {
      notifications.show({
        id: "authCode-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "認証情報取得エラー",
        message: "LINE認証情報の取得に失敗しました。再度の認証をお願いします。",
        color: "red",
        loading: false,
      });
      router.push(`${USER_ACCOUNT_REGISTER_PAGE_PATH}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (fetching) {
    return <Loader size={30} />;
  }

  return (
    <>
      {data?.getUserRegisterToken && <>{data.getUserRegisterToken.lineName}</>}
    </>
  );
};
