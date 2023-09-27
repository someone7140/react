"use client";

import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import {
  componentColumnContainerStyle,
  componentContainerStyle,
} from "@/style/CommonStyle";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

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
        <Button
          color="success"
          pill
          onClick={() => {
            router.push("/myPostAdd/placeAndPost");
          }}
        >
          <p>場所を新規登録して投稿</p>
        </Button>
        <Button
          color="success"
          pill
          onClick={() => {
            router.push("/");
          }}
        >
          <p>登録済みの場所で投稿</p>
        </Button>
      </div>
    </div>
  );
}
