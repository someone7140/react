"use client";

import NovelTopComponent from "components/novel/NovelTopComponent";
import { useAuthStore } from "hooks/store/useAuthStore";

export default function NovelTopPage() {
  const authStore = useAuthStore();

  return (
    <div style={{ textAlign: "center" }}>
      {authStore?.userAccount && (
        <>
          <div style={{ paddingBottom: 15, fontSize: 20 }}>小説管理</div>
          <NovelTopComponent />
        </>
      )}
    </div>
  );
}
