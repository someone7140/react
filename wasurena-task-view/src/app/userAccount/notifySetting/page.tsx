"use client";

import { useAtom } from "jotai";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { UserAccountNotifySettingComponent } from "@/components/userAccount/UserAccountNotifySettingComponent";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
  const [userAccountState] = useAtom(userAccountAtom);

  return (
    <div>
      <div className={pageTitleStyle()}>LINE通知設定</div>
      {userAccountState && <UserAccountNotifySettingComponent />}
    </div>
  );
}
