"use client";

import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button } from "flowbite-react";
import React, { FC } from "react";

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
      color="purple"
      pill
      onClick={login}
      disabled={disabledFlag}
      className="w-32"
    >
      <p>Google認証</p>
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
