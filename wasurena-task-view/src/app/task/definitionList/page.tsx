"use client";

import { useAtom } from "jotai";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TaskDefinitionListComponent } from "@/components/task/TaskDefinitionListComponent";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
  const [userAccountState] = useAtom(userAccountAtom);

  return (
    <div>
      <div className={pageTitleStyle()}>タスク定義一覧</div>
      {userAccountState && <TaskDefinitionListComponent />}
    </div>
  );
}
