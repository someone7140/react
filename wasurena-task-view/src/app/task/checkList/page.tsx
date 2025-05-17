"use client";

import { useAtom } from "jotai";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TaskCheckListComponent } from "@/components/task/TaskCheckListComponent";

export default function Home() {
  const [userAccountState] = useAtom(userAccountAtom);

  return <div>{userAccountState && <TaskCheckListComponent />}</div>;
}
