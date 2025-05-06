"use client";

import { useAtom } from "jotai";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TaskCategoryRegisterComponent } from "@/components/category/TaskCategoryRegisterComponent";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
  const [userAccountState] = useAtom(userAccountAtom);

  return (
    <div>
      <div className={pageTitleStyle()}>カテゴリー登録</div>
      {userAccountState && <TaskCategoryRegisterComponent />}
    </div>
  );
}
