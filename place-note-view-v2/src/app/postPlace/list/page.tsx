"use client";

import { useSearchParams } from "next/navigation";

import { PostPlaceListComponent } from "@/components/postPlace/PostPlaceListComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();
  const searchParams = useSearchParams();
  const editPostId = searchParams.get("editPostId");

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>場所一覧</div>
          <PostPlaceListComponent editPostId={editPostId ?? undefined} />
        </>
      )}
    </>
  );
}
