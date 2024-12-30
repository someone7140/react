"use client";

import { useAuthManagement } from "@/hooks/useAuthManagement";
import { PostListComponent } from "@/components/post/PostListComponent";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>
            「{userAccount.name}」さんの投稿一覧
          </div>
          <PostListComponent />
        </>
      )}
    </>
  );
}
