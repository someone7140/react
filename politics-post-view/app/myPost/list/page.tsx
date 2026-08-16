"use client";

import { MyPostListComponent } from "@/components/post/MyPostListComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>自投稿一覧</div>
          <MyPostListComponent />
        </>
      )}
    </>
  );
}
