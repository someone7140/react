"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { RaceInfoDetailComponent } from "@/components/feature/race/RaceInfoDetailComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
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
        <RaceInfoDetailComponent raceInfoId={id} />
      )}
    </>
  );
}
