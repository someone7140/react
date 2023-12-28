"use client";
import { useRouter } from "next/navigation";

import { AuthGoogleComponent } from "@/components/feature/auth/AuthGoogleComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();

  if (authStore.userAccount) {
    // ユーザアカウントが存在したらトップへ
    router.push("/");
  }

  return (
    <div>
      <AuthGoogleComponent />
    </div>
  );
}
