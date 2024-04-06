"use client";

import { RaceInfoListComponent } from "@/components/feature/race/RaceInfoListComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return <>{authStore.userAccount && <RaceInfoListComponent />}</>;
}
