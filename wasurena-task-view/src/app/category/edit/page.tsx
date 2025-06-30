"use client";

import { Suspense } from "react";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { Loader } from "@mantine/core";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TaskCategoryEditComponent } from "@/components/category/TaskCategoryEditComponent";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
  return (
    <Suspense fallback={<Loader size={30} />}>
      <PageComponent />
    </Suspense>
  );
}

function PageComponent() {
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
