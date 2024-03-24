"use client";

import { AuthUserAccountForRegisterComponent } from "@/components/feature/userAccount/AuthUserAccountForRegisterComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return (
    <div>
      {!authStore.userAccount && <AuthUserAccountForRegisterComponent />}
    </div>
  );
}
