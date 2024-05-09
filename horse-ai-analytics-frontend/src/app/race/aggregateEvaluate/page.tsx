"use client";

import { RaceEvaluateRefComponent } from "@/components/feature/race/RaceEvaluateRefComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return <div>{authStore.userAccount && <RaceEvaluateRefComponent />}</div>;
}
