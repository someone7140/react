"use client";

import { AnalyticsRaceInputComponent } from "@/components/feature/race/input/AnalyticsRaceInputComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const authStore = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    // idのパラメータがなければトップへ
    router.push("/");
  }

  return <div>{authStore.userAccount && <>{id}</>}</div>;
}
