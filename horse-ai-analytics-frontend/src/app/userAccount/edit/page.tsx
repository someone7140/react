"use client";

import { AuthUserAccountEditComponent } from "@/components/feature/userAccount/AuthUserAccountEditComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return (
    <div>
      {authStore.userAccount && (
        <AuthUserAccountEditComponent userAccount={authStore.userAccount} />
      )}
    </div>
  );
}
