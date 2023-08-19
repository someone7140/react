"use client";

import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button } from "flowbite-react";
import React, { FC } from "react";

type Props = {
  onAuthGoogle: (authCode: string) => void;
};

const GoogleLoginComponent: FC<Props> = ({ onAuthGoogle }) => {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      onAuthGoogle(codeResponse.code);
    },
    flow: "auth-code",
    scope: "email profile openid", // scopeはスペース区切り
  });

  return (
    <Button color="purple" pill onClick={login}>
      <p>Google認証</p>
    </Button>
  );
};

export const AuthGoogleComponent: FC<Props> = ({ onAuthGoogle }) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
    >
      <GoogleLoginComponent onAuthGoogle={onAuthGoogle} />
    </GoogleOAuthProvider>
  );
};
