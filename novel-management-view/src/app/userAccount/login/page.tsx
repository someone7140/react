"use client";

import { UserAccountLoginComponent } from "@/components/userAccount/UserAccountLoginComponent";
import { useAppSelector } from "@/store/reduxStore";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const userAccount = useAppSelector((state) => state.userAccount);

  return (
    <>
      {!userAccount && (
        <>
          <div className={pageTitleStyle()}>ログイン</div>
          <UserAccountLoginComponent />
        </>
      )}
    </>
  );
}
