"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();
  const searchParams = useSearchParams();
  const placeId = searchParams.get("place_id");

  if (!placeId || !authStore.userAccount) {
    // idのパラメータが無いまたはユーザアカウントが存在してなければトップへ
    router.push("/");
  }

  return (
    <div>
      <div className={centerHorizonContainerStyle()}>投稿</div>
    </div>
  );
}
