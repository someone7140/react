"use client";

import { useSearchParams } from "next/navigation";

import { UserAccountProfileComponent } from "@/components/userAccount/UserAccountProfileComponent";

export default function Home() {
  const searchParams = useSearchParams();
  const userSettingId = searchParams.get("userSettingId");

  return (
    <>
      {userSettingId && (
        <UserAccountProfileComponent userSettingId={userSettingId} />
      )}
    </>
  );
}
