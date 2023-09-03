"use client";

import { useState } from "react";

import { AuthUserAccountComponent } from "@/components/auth/AuthUserAccountComponent";
import { AuthState } from "@/type/AuthType";
import { UserAccountCreateComponent } from "@/components/user/UserAccountCreateComponent";
import { componentContainerStyle } from "@/style/CommonStyle";

export default function Home() {
  const [authState, setAuthState] = useState<AuthState | undefined>(undefined);

  return (
    <div className={componentContainerStyle()}>
      {!authState && <AuthUserAccountComponent setAuthState={setAuthState} />}
      {authState && <UserAccountCreateComponent authState={authState} />}
    </div>
  );
}
