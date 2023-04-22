"use client";

import { useSearchParams } from "next/navigation";

import NovelSettingDetailComponent from "components/novelSetting/detail/NovelSettingDetailComponent";
import { useAuthStore } from "hooks/store/useAuthStore";

export default function NovelSettingDetailPage() {
  const authStore = useAuthStore();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const novelId = searchParams.get("novelId");

  return (
    <>
      {authStore?.userAccount && id && novelId && (
        <NovelSettingDetailComponent id={id} novelId={novelId} />
      )}
    </>
  );
}
