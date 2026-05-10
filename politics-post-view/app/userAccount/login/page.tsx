"use client";

import { UserAccountLoginComponent } from "@/components/userAccount/UserAccountLoginComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();

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
