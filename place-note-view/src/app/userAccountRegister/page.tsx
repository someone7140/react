"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthUserAccountForRegisterComponent } from "@/components/auth/AuthUserAccountForRegisterComponent";
import { UserAccountCreateComponent } from "@/components/user/UserAccountCreateComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { componentContainerStyle } from "@/style/CommonStyle";
import { AuthState } from "@/type/AuthType";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();
  const [authState, setAuthState] = useState<AuthState | undefined>(undefined);

  if (authStore.userAccount) {
    // ユーザアカウントが存在したらトップへ
    router.push("/");
  }

  return (
    <div className={componentContainerStyle()}>
      {!authState && (
        <AuthUserAccountForRegisterComponent setAuthState={setAuthState} />
      )}
      {authState && <UserAccountCreateComponent authState={authState} />}
    </div>
  );
}
