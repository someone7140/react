import React, { FC } from "react";

type Props = {
  authCode: string;
};

export const UserAccountRegisterComponent: FC<Props> = ({ authCode }) => {
  console.log(authCode);
  return <>ユーザ登録</>;
};
