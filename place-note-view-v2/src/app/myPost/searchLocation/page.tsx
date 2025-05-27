"use client";

import { PostSearchLocationComponent } from "@/components/post/PostSearchLocationComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>投稿の位置検索</div>
          <PostSearchLocationComponent />
        </>
      )}
    </>
  );
}
