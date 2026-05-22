"use client";

import { PostRegisterComponent } from "@/components/post/PostRegisterComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>投稿追加</div>
          <PostRegisterComponent />
        </>
      )}
    </>
  );
}
