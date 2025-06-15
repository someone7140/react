"use client";

import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TaskEditComponent } from "@/components/task/TaskEditComponent";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
  const [userAccountState] = useAtom(userAccountAtom);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div>
      <div className={pageTitleStyle()}>タスク編集</div>
      {userAccountState && id && <TaskEditComponent id={id} />}
    </div>
  );
}
