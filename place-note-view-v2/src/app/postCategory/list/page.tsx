"use client";

import { PostCategoryListComponent } from "@/components/postCategory/PostCategoryListComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>カテゴリー一覧</div>
          <PostCategoryListComponent />
        </>
      )}
    </>
  );
}
