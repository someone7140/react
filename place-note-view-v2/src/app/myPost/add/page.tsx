"use client";

import { useSearchParams } from "next/navigation";

import { PostRegisterComponent } from "@/components/post/PostRegisterComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export default function Home() {
  const { userAccount } = useAuthManagement();
  const searchParams = useSearchParams();
  const placeId = searchParams.get("placeId") ?? undefined;

  return (
    <>
      {userAccount && (
        <>
          <PostRegisterComponent placeId={placeId} />
        </>
      )}
    </>
  );
}
