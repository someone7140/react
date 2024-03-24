"use client";

import { RegisteredRaceInfoListComponent } from "@/components/feature/race/RegisteredRaceInfoListComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return <>{authStore.userAccount && <RegisteredRaceInfoListComponent />}</>;
}
