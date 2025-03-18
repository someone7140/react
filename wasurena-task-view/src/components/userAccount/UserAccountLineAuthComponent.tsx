import { Button } from "@mantine/core";
import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  redirectUrl: string;
};

export const UserAccountLineAuthComponent: FC<Props> = ({ redirectUrl }) => {
  const authClick = () => {
    const lineUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&scope=profile openid&client_id=${
      process.env.NEXT_PUBLIC_LINE_CHANNEL_ID
    }&state=${uuidv4()}&redirect_uri=${redirectUrl}`;
    window.location.href = encodeURI(lineUrl);
  };

  return (
    <Button variant="filled" color="green" onClick={authClick}>
      LINE 認証
    </Button>
  );
};
