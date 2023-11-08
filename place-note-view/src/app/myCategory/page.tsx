"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";
import { RegisteredPostCategoryListComponent } from "@/components/postCategoryRegister/RegisteredPostCategoryListComponent";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();

  if (!authStore.userAccount) {
    // ユーザアカウントが存在してなければトップへ
    router.push("/");
  }

  return (
    <div>
      <div className={centerHorizonContainerStyle()}>登録カテゴリーの一覧</div>
      <RegisteredPostCategoryListComponent />
    </div>
  );
}
