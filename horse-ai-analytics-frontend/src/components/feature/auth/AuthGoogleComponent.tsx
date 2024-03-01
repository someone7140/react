"use client";

import React, { FC } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

import { Button } from "@/components/ui/button";
import { buttonStyle } from "@/styles/CommonStyle";

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
      className={buttonStyle({ color: "indigo" })}
      onClick={login}
      disabled={disabledFlag}
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
