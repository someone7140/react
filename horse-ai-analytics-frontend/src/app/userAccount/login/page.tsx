"use client";

import { AuthUserAccountLoginComponent } from "@/components/feature/userAccount/AuthUserAccountLoginComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return (
    <div>{!authStore.userAccount && <AuthUserAccountLoginComponent />}</div>
  );
}
