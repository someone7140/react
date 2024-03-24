"use client";

import { AnalyticsRaceInputComponent } from "@/components/feature/race/input/AnalyticsRaceInputComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return <div>{authStore.userAccount && <AnalyticsRaceInputComponent />}</div>;
}
