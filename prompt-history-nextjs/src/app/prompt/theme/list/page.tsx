"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();

  if (!authStore.userAccount) {
    // 未ログインであればトップへ
    router.push("/");
  }

  return <div>課題テーマ一覧</div>;
}
