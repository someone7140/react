"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { QuestionAddComponent } from "@/components/feature/prompt/question/QuestionAddComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const router = useRouter();
  const authStore = useAuthStore();
  const searchParams = useSearchParams();
  const id = searchParams.get("themeId");

  if (!id || !authStore.userAccount) {
    // idのパラメータが無いまたはユーザアカウントが存在してなければトップへ
    router.push("/");
  }

  return <QuestionAddComponent themeId={id ?? ""} />;
}
