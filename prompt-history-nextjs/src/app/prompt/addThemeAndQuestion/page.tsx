"use client";

import { useRouter } from "next/navigation";

import { AddThemeAndQuestionComponent } from "@/components/feature/prompt/AddThemeAndQuestionComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();

  if (!authStore.userAccount) {
    // 未ログインであればトップへ
    router.push("/");
  }

  return (
    <div>
      <AddThemeAndQuestionComponent />
    </div>
  );
}
