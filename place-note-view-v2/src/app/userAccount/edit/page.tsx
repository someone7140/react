"use client";

import { UserAccountEditComponent } from "@/components/userAccount/UserAccountEditComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();

  return (
    <>
      {userAccount && (
        <>
          <div className={pageTitleStyle()}>ユーザ情報編集</div>
          <UserAccountEditComponent />
        </>
      )}
    </>
  );
}
