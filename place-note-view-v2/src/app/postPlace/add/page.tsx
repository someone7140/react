"use client";

import { PostPlaceRegisterComponent } from "@/components/postPlace/PostPlaceRegisterComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>場所追加</div>
          <PostPlaceRegisterComponent />
        </>
      )}
    </>
  );
}
