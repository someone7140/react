"use client";

import { AuthUserAccountForLoginComponent } from "@/components/feature/userAccount/AuthUserAccountForLoginComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return (
    <div>{!authStore.userAccount && <AuthUserAccountForLoginComponent />}</div>
  );
}
