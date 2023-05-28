"use client";

import { useSearchParams } from "next/navigation";

import NovelPromptComponent from "components/novelPrompt/NovelPromptComponent";
import { useAuthStore } from "hooks/store/useAuthStore";

export default function NovelPromptPage() {
  const authStore = useAuthStore();
  const searchParams = useSearchParams();
  const novelId = searchParams.get("novelId");

  return (
    <>
      {authStore?.userAccount && novelId && (
        <NovelPromptComponent novelId={novelId} />
      )}
    </>
  );
}
