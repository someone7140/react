"use client";

import { UserAccountRegisterComponent } from "@/components/userAccount/UserAccountRegisterComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const { userAccount } = useAuthManagement();

  return (
    <>
      {!userAccount && (
        <>
          <div className={pageTitleStyle()}>会員登録</div>
          <UserAccountRegisterComponent />
        </>
      )}
    </>
  );
}
