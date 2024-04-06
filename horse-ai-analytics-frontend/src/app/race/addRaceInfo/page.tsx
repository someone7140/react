"use client";

import { RegisterRaceInfoComponent } from "@/components/feature/race/RegisterRaceInfoComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return <div>{authStore.userAccount && <RegisterRaceInfoComponent />}</div>;
}
