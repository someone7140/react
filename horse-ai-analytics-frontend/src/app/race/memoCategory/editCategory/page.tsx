"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { EditMemoCategoryComponent } from "@/components/feature/raceMemoCategory/EditMemoCategoryComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    // idのパラメータがなければトップへ
    router.push("/");
  }

  return (
    <div>
      {authStore.userAccount && (
        <EditMemoCategoryComponent categoryId={id ?? ""} />
      )}
    </div>
  );
}
