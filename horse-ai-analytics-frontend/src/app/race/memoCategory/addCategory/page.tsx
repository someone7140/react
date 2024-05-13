"use client";

import { RegisterRaceMemoCategoryComponent } from "@/components/feature/raceMemoCategory/RegisterRaceMemoCategoryComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return (
    <div>{authStore.userAccount && <RegisterRaceMemoCategoryComponent />}</div>
  );
}
