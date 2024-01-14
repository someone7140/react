"use client";
import { useRouter } from "next/navigation";

import { AuthUserAccountForLoginComponent } from "@/components/feature/userAccount/AuthUserAccountForLoginComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();

  if (authStore.userAccount) {
    // ログイン済みであればトップへ
    router.push("/");
  }

  return (
    <div>
      <AuthUserAccountForLoginComponent />
    </div>
  );
}
