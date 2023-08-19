"use client";

import { useState } from "react";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";
import { AuthMethod } from "@/gen/placeNote_pb";
import { AuthState } from "@/type/AuthType";
import { UserRegisterComponent } from "@/components/user/UserRegisterComponent";
import {
  centerHorizonContainerStyle,
  componentContainerStyle,
} from "@/style/CommonStyle";

export default function Home() {
  const [authState, setAuthState] = useState<AuthState | undefined>({
    authMethod: AuthMethod.GOOGLE,
    token: "token",
  });

  return (
    <div className={componentContainerStyle()}>
      {/*
      {!authState && (
        <>
          ユーザ登録用の認証
          <AuthGoogleComponent
            onAuthGoogle={(authCode: string) => {
              console.log(authCode);
              setAuthState({ authMethod: AuthMethod.GOOGLE, token: authCode });
            }}
          />
        </>
      )}
          */}
      {authState && (
        <div>
          <div className={centerHorizonContainerStyle()}>ユーザ登録</div>
          <UserRegisterComponent authState={authState} />
        </div>
      )}
    </div>
  );
}
