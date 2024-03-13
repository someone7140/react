"use client";

import { useRouter } from "next/navigation";

import { AnalyticsRaceInputComponent } from "@/components/feature/race/input/AnalyticsRaceInputComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();

  if (!authStore.userAccount) {
    // 未ログインであればトップへ
    router.push("/");
  }

  return (
    <div>
      <AnalyticsRaceInputComponent />
    </div>
  );
}
