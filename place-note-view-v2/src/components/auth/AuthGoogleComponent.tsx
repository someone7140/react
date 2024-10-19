"use client";

import React, { FC } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button } from "@material-tailwind/react";

type Props = {
  onAuthGoogle: (authCode: string) => void;
  disabledFlag?: boolean;
};

const GoogleLoginComponent: FC<Props> = ({ onAuthGoogle, disabledFlag }) => {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      onAuthGoogle(codeResponse.code);
    },
    flow: "auth-code",
    scope: "email profile openid",
  });

  return (
    <Button
      variant="filled"
      disabled={disabledFlag}
      onClick={login}
      color="light-blue"
    >
      Google認証
    </Button>
  );
};

export const AuthGoogleComponent: FC<Props> = ({
  onAuthGoogle,
  disabledFlag,
}) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
    >
      <GoogleLoginComponent
        onAuthGoogle={onAuthGoogle}
        disabledFlag={disabledFlag}
      />
    </GoogleOAuthProvider>
  );
};
