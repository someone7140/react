"use client";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return (
    <>
      {authStore.userAccount && (
        <>ヘッダーの管理メニューからレース情報の登録や参照ができます</>
      )}
      {!authStore.userAccount && (
        <>使用するにはログインもしくはユーザ登録を行なってください</>
      )}
    </>
  );
}
