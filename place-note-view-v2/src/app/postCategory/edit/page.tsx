"use client";

import { useSearchParams } from "next/navigation";

import { PostCategoryEditComponent } from "@/components/postCategory/PostCategoryEditComponent";
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
          <div className={pageTitleStyle()}>カテゴリー編集</div>
          <PostCategoryEditComponent id={id} />
        </>
      )}
    </>
  );
}
