"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { Loader } from "@mantine/core";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TaskCheckListComponent } from "@/components/task/TaskCheckListComponent";
import { useGetTaskCheckDisplayListTopQuery } from "@/graphql/gen/graphql";
import { linkStyle } from "@/style/commonStyle";

export default function Home() {
  const [userAccountState] = useAtom(userAccountAtom);
  const [{ data, fetching, error }] = useGetTaskCheckDisplayListTopQuery({
    requestPolicy: "network-only",
    pause: !userAccountState,
  });

  return (
    <div>
      {!userAccountState && (
        <div className="mr-3 mt-3">
          わすれなタスクは定期的なタスクを管理するツールです。
          <br />
          <Link href={"/userAccount/login"} className={linkStyle()}>
            ログイン
          </Link>
          もしくは
          <Link href={"/userAccount/register"} className={linkStyle()}>
            会員登録
          </Link>
          を行なって使用してください。
        </div>
      )}
      {userAccountState && (
        <>
          {fetching && <Loader size={30} />}
          {data?.getTaskCheckDisplayList && (
            <TaskCheckListComponent
              taskCheckList={data.getTaskCheckDisplayList}
              error={error}
            />
          )}
        </>
      )}
    </div>
  );
}
