"use client";

import { RegisteredRaceInfoDetailComponent } from "@/components/feature/race/RegisteredRaceInfoDetailComponent";
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

  return (
    <>
      {authStore.userAccount && id && (
        <RegisteredRaceInfoDetailComponent raceInfoId={id} />
      )}
    </>
  );
}
