"use client";

import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TaskCategoryEditComponent } from "@/components/category/TaskCategoryEditComponent";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
  const [userAccountState] = useAtom(userAccountAtom);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div>
      <div className={pageTitleStyle()}>カテゴリー編集</div>
      {userAccountState && id && <TaskCategoryEditComponent id={id} />}
    </div>
  );
}
