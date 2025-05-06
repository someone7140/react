"use client";

import { useAtom } from "jotai";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TaskCategoryListComponent } from "@/components/category/TaskCategoryListComponent";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
  const [userAccountState] = useAtom(userAccountAtom);

  return (
    <div>
      <div className={pageTitleStyle()}>カテゴリー一覧</div>
      {userAccountState && <TaskCategoryListComponent />}
    </div>
  );
}
