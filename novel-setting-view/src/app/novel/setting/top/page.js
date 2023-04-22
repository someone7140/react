"use client";

import { useSearchParams } from "next/navigation";

import NovelSettingTopComponent from "components/novelSetting/NovelSettingTopComponent";
import { useAuthStore } from "hooks/store/useAuthStore";

export default function NovelSettingTopPage() {
  const authStore = useAuthStore();
  const searchParams = useSearchParams();
  const novelId = searchParams.get("novelId");

  return (
    <>
      {authStore?.userAccount && novelId && (
        <NovelSettingTopComponent novelId={novelId} />
      )}
    </>
  );
}
