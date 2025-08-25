"use client";

import { NovelListComponentComponent } from "@/components/novel/NovelListComponent";
import { useAppSelector } from "@/store/reduxStore";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const userAccount = useAppSelector((state) => state.userAccount);

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>小説一覧</div>
          <NovelListComponentComponent />
        </>
      )}
    </>
  );
}
