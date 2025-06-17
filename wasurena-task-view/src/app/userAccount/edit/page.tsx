"use client";

import { useAtom } from "jotai";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { UserAccountEditComponent } from "@/components/userAccount/UserAccountEditComponent";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
  const [userAccountState] = useAtom(userAccountAtom);

  return (
    <div>
      <div className={pageTitleStyle()}>ユーザー情報の編集</div>
      {userAccountState && <UserAccountEditComponent />}
    </div>
  );
}
