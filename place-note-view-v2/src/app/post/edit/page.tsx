"use client";

import { useSearchParams } from "next/navigation";

import { PostEditComponent } from "@/components/post/PostEditComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const placeId = searchParams.get("placeId");

  return (
    <>
      {userAccount && id && (
        <>
          <div className={pageTitleStyle()}>投稿編集</div>
          <PostEditComponent id={id} placeId={placeId ?? undefined} />
        </>
      )}
    </>
  );
}
