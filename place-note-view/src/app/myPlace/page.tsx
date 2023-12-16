"use client";

import { useRouter } from "next/navigation";

import { PlaceActionComponent } from "@/components/placeRegister/PlaceActionComponent";
import { PlaceListSelectComponent } from "@/components/place/PlaceListSelectComponent";
import { PostPlaceResponse } from "@/gen/placeNotePostPlaceService_pb";
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
      <div className={`${centerHorizonContainerStyle()} mb-2`}>
        登録した場所の一覧
      </div>
      <PlaceListSelectComponent
        placeActionRender={(place: PostPlaceResponse, refetch?: () => {}) => {
          return <PlaceActionComponent place={place} refetch={refetch} />;
        }}
      />
    </div>
  );
}
