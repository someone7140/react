"use client";

import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";

import { PostRegisterPlaceSelectComponent } from "@/components/postRegister/PostRegisterPlaceSelectComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import {
  centerHorizonContainerStyle,
  componentColumnContainerStyle,
  componentContainerStyle,
} from "@/style/CommonStyle";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();

  if (!authStore.userAccount) {
    // ユーザアカウントが存在してなければトップへ
    router.push("/");
  }

  return (
    <div className={componentContainerStyle()}>
      <div className={componentColumnContainerStyle()}>
        <div className={`${centerHorizonContainerStyle()}`}>
          <Button
            color="success"
            pill
            onClick={() => {
              router.push("/myPostAdd/placeAndPost");
            }}
            className="w-52"
          >
            <p>場所を新規登録して投稿</p>
          </Button>
        </div>
        <div className="mt-4">
          登録済みの場所を選択して投稿
          <PostRegisterPlaceSelectComponent />
        </div>
      </div>
    </div>
  );
}
