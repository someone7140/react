"use client";

import { useState } from "react";

import { AuthUserAccountComponent } from "@/components/auth/AuthUserAccountComponent";
import { UserAccountCreateComponent } from "@/components/user/UserAccountCreateComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { componentContainerStyle } from "@/style/CommonStyle";
import { AuthState } from "@/type/AuthType";
import { useRouter } from "next/navigation";

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
      {!authState && <AuthUserAccountComponent setAuthState={setAuthState} />}
      {authState && <UserAccountCreateComponent authState={authState} />}
    </div>
  );
}
