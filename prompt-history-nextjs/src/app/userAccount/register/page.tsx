"use client";
import { useRouter } from "next/navigation";

import { AuthUserAccountForRegisterComponent } from "@/components/feature/userAccount/AuthUserAccountForRegisterComponent";
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
      <AuthUserAccountForRegisterComponent />
    </div>
  );
}
