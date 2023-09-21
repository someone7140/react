"use client";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { componentContainerStyle } from "@/style/CommonStyle";
import { useRouter } from "next/navigation";
import { AuthUserAccountLoginComponent } from "@/components/auth/AuthUserAccountLoginComponent";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();

  if (authStore.userAccount) {
    // ユーザアカウントが存在したらトップへ
    router.push("/");
  }

  return (
    <div className={componentContainerStyle()}>
      <AuthUserAccountLoginComponent />
    </div>
  );
}
