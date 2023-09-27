"use client";

import { useRouter } from "next/navigation";

import { PlaceRegisterComponent } from "@/components/placeRegister/PlaceRegisterComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();

  if (!authStore.userAccount) {
    // ユーザアカウントが存在してなければトップへ
    router.push("/");
  }

  return (
    <div>
      <div className={centerHorizonContainerStyle()}>ユーザ登録</div>
      <PlaceRegisterComponent />
    </div>
  );
}
