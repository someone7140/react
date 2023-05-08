"use client";

import { useSearchParams } from "next/navigation";

import NovelContentsComponent from "components/novelContents/NovelContentsComponent";
import { useAuthStore } from "hooks/store/useAuthStore";

export default function NovelContentsPage() {
  const authStore = useAuthStore();
  const searchParams = useSearchParams();
  const novelId = searchParams.get("novelId");

  return (
    <>
      {authStore?.userAccount && novelId && (
        <NovelContentsComponent novelId={novelId} />
      )}
    </>
  );
}
