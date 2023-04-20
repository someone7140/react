"use client";

import { useRouter } from "next/router";

import NovelSettingTopComponent from "components/novelSetting/NovelSettingTopComponent";
import { useAuthStore } from "hooks/store/useAuthStore";

export default function NovelSettingTopPage() {
  const router = useRouter();
  const authStore = useAuthStore();

  return (
    <>
      {authStore?.userAccount && router.query.novelId && (
        <NovelSettingTopComponent novelId={router.query.novelId} />
      )}
    </>
  );
}
