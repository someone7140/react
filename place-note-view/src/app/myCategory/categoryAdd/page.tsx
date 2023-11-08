"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";
import { PostCategoryRegisterComponent } from "@/components/postCategoryRegister/PostCategoryRegisterComponent";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();

  if (!authStore.userAccount) {
    // ユーザアカウントが存在してなければトップへ
    router.push("/");
  }

  return (
    <div>
      <div className={centerHorizonContainerStyle()}>カテゴリーの追加</div>
      <PostCategoryRegisterComponent />
    </div>
  );
}
