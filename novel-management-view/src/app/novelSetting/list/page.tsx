"use client";

import { useSearchParams } from "next/navigation";

import { NovelSettingListComponent } from "@/components/novelSetting/NovelSettingListComponent";
import { useAppSelector } from "@/store/reduxStore";

export default function Home() {
  const userAccount = useAppSelector((state) => state.userAccount);
  const searchParams = useSearchParams();
  const novelId = searchParams.get("novelId");

  return (
    <>
      {userAccount && novelId && (
        <NovelSettingListComponent novelId={novelId} />
      )}
    </>
  );
}
