"use client";

import { useSearchParams } from "next/navigation";

import { PostPlaceRegisterComponent } from "@/components/postPlace/PostPlaceRegisterComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();
  const searchParams = useSearchParams();
  const isFromPost = searchParams.get("isFromPost") === "true";

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>場所追加</div>
          <PostPlaceRegisterComponent isFromPost={isFromPost} />
        </>
      )}
    </>
  );
}
