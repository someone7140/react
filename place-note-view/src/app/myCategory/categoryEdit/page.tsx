"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";
import { PostCategoryUpdateComponent } from "@/components/postCategoryRegister/PostCategoryUpdateComponent";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id || !authStore.userAccount) {
    // idのパラメータが無いまたはユーザアカウントが存在してなければトップへ
    router.push("/");
  }

  return (
    <div>
      <div className={centerHorizonContainerStyle()}>登録カテゴリーの一覧</div>
      <PostCategoryUpdateComponent categoryId={id ?? ""} />
    </div>
  );
}
