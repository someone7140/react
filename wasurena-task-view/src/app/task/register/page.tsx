"use client";

import { useAtom } from "jotai";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TaskRegisterComponent } from "@/components/task/TaskRegisterComponent";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
  const [userAccountState] = useAtom(userAccountAtom);

  return (
    <div>
      <div className={pageTitleStyle()}>タスク登録</div>
      {userAccountState && <TaskRegisterComponent />}
    </div>
  );
}
