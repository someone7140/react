"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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

  const afterRegisterAction = (placeId: string | undefined) => {
    if (placeId) {
      toast("場所を登録しました");
      router.push(`/myPostAdd/postRegister?place_id=${placeId}`);
    } else {
      router.push("/myPlace");
    }
  };

  return (
    <div>
      <div className={centerHorizonContainerStyle()}>場所の登録</div>
      <PlaceRegisterComponent afterRegisterAction={afterRegisterAction} />
    </div>
  );
}
