"use client";

import { useSearchParams } from "next/navigation";

import { useAuthManagement } from "@/hooks/useAuthManagement";
import { PostListComponent } from "@/components/post/PostListComponent";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();
  const searchParams = useSearchParams();
  const placeId = searchParams.get("placeId");

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>
            「{userAccount.name}」さんの投稿一覧
          </div>
          <PostListComponent placeIdFilter={placeId ?? undefined} />
        </>
      )}
    </>
  );
}
