"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { PostRegisterComponent } from "@/components/postRegister/PostRegisterComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

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
      <PostRegisterComponent placeId={placeId ?? ""} />
    </div>
  );
}
