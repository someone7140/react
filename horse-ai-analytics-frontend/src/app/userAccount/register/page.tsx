"use client";

import { AuthUserAccountRegisterComponent } from "@/components/feature/userAccount/AuthUserAccountRegisterComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return (
    <div>{!authStore.userAccount && <AuthUserAccountRegisterComponent />}</div>
  );
}
