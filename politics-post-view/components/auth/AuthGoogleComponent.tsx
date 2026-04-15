"use client";

import { FC, useState } from "react";
import { Button } from "@heroui/react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

type Props = {
  onAuthGoogle: (authCode: string) => Promise<void>;
};

const GoogleLoginComponent: FC<Props> = ({ onAuthGoogle }) => {
  const [disabledFlag, setDisabledFlag] = useState<boolean>(false);
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setDisabledFlag(true);
      await onAuthGoogle(codeResponse.code);
      setDisabledFlag(false);
    },
    flow: "auth-code",
    scope: "email profile openid",
  });

  return (
    <Button isDisabled={disabledFlag} onPress={login}>
      Google認証
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
