"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { ThemeByIdComponent } from "@/components/feature/prompt/theme/ThemeByIdComponent";

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
      <ThemeByIdComponent id={id ?? ""} />
    </div>
  );
}
