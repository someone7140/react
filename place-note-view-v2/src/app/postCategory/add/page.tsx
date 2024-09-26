"use client";

import { PostCategoryRegisterComponent } from "@/components/postCategory/PostCategoryRegisterComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>カテゴリー追加</div>
          <PostCategoryRegisterComponent />
        </>
      )}
    </>
  );
}
