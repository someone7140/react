"use client";

import React, { FC, useEffect } from "react";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { CombinedError } from "urql";

import { TaskCheckCardComponent } from "./ref/TaskCheckCardComponent";
import { TASK_DEFINITION_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import { TaskCheckForListResponse } from "@/graphql/gen/graphql";
import { useTaskUtil } from "@/hooks/useTaskUtil";
import { linkStyle, pageTitleStyle } from "@/style/commonStyle";

type Props = {
  taskCheckList: TaskCheckForListResponse[];
  error: CombinedError | undefined;
};

export const TaskCheckListComponent: FC<Props> = ({ taskCheckList, error }) => {
  const { getCategorizeCheckList } = useTaskUtil();

  useEffect(() => {
    if (error) {
      notifications.show({
        id: "getTaskCheckList-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "取得エラー",
        message: "チェック一覧の取得に失敗しました",
        color: "red",
        loading: false,
      });
    }
  }, [error]);

  const categorizeCheckList = getCategorizeCheckList(taskCheckList);

  return (
    <>
      {taskCheckList.length === 0 && (
        <div className="w-[310px]">
          チェック対象がありません。タスク定義は
          <Link
            href={TASK_DEFINITION_LIST_PAGE_PATH}
            className={`${linkStyle()}`}
          >
            こちら
          </Link>
          から確認ができます。
        </div>
      )}
      {taskCheckList.length > 0 && (
        <div className="flex flex-col gap-5 min-w-[300px] max-w-[335px]">
          <div className={`${pageTitleStyle()} mt-5`}>【期限指定タスク】</div>
          {categorizeCheckList.checkTask.length === 0 && (
            <>期限指定タスクはありません</>
          )}
          {categorizeCheckList.checkTask.length > 0 && (
            <>
              {categorizeCheckList.checkTask.map((check) => {
                return (
                  <TaskCheckCardComponent checkTask={check} key={check.id} />
                );
              })}
            </>
          )}
          <div className={pageTitleStyle()}>【期限未指定タスク】</div>
          {categorizeCheckList.notCheckTask.length === 0 && (
            <>期限未指定タスクはありません</>
          )}
          {categorizeCheckList.notCheckTask.length > 0 && (
            <>
              {categorizeCheckList.notCheckTask.map((check) => {
                return (
                  <TaskCheckCardComponent checkTask={check} key={check.id} />
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
};
