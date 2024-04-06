"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { EditRaceInfoComponent } from "@/components/feature/race/EditRaceInfoComponent";
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
    <div>
      {authStore.userAccount && <EditRaceInfoComponent raceInfoId={id ?? ""} />}
    </div>
  );
}
