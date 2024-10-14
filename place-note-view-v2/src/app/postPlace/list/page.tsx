"use client";

import { PostPlaceListComponent } from "@/components/postPlace/PostPlaceListComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>場所一覧</div>
          <PostPlaceListComponent />
        </>
      )}
    </>
  );
}
