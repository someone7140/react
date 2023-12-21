"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

import { PlaceActionComponent } from "@/components/placeRegister/PlaceActionComponent";
import { PlaceListSelectComponent } from "@/components/place/PlaceListSelectComponent";
import { PostPlaceResponse } from "@/gen/placeNotePostPlaceService_pb";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import {
  centerHorizonContainerStyle,
  componentColumnContainerStyle,
} from "@/style/CommonStyle";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();

  if (!authStore.userAccount) {
    // ユーザアカウントが存在してなければトップへ
    router.push("/");
  }

  return (
    <div className={`flex flex-col`}>
      <div className={`${centerHorizonContainerStyle()}`}>
        <Button
          color="success"
          pill
          onClick={() => {
            router.push("/myPlace/add");
          }}
          className="w-48"
        >
          <p>場所を新規登録</p>
        </Button>
      </div>
      <div className={`${centerHorizonContainerStyle()} mt-3`}>
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
