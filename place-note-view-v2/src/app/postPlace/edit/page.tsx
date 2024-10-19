"use client";

import { useSearchParams } from "next/navigation";

import { PostPlaceEditComponent } from "@/components/postPlace/PostPlaceEditComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <>
      {userAccount && id && (
        <>
          <div className={pageTitleStyle()}>場所編集</div>
          <PostPlaceEditComponent placeId={id} />
        </>
      )}
    </>
  );
}
