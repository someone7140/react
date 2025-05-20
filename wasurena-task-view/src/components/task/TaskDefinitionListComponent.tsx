"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { Button, Card, Loader } from "@mantine/core";
import { useAtomValue } from "jotai";

import { TaskDefinitionDeleteModalComponent } from "./modal/TaskDefinitionDeleteModalComponent";
import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TASK_REGISTER_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  TaskDefinitionResponse,
  useGetTaskDefinitionsQuery,
} from "@/graphql/gen/graphql";
import { useTaskUtil } from "@/hooks/useTaskUtil";
import { linkStyle } from "@/style/commonStyle";

export const TaskDefinitionListComponent: FC = ({}) => {
  const [{ data, fetching, error }, reexecuteQuery] =
    useGetTaskDefinitionsQuery({ requestPolicy: "network-only" });
  const [deleteTask, setDeleteTask] = useState<
    TaskDefinitionResponse | undefined
  >(undefined);
  const { getDeadLineCheckDisplay } = useTaskUtil();
  const userAccountState = useAtomValue(userAccountAtom);

  const refetchDefinitionList = () => {
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  useEffect(() => {
    if (error) {
      notifications.show({
        id: "getTaskDefinitions-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "取得エラー",
        message: "タスク定義の取得に失敗しました",
        color: "red",
        loading: false,
      });
    }
  }, [error]);

  const definitionList = data?.getTaskDefinitions;

  return (
    <>
      {fetching && <Loader size={30} />}
      {!fetching && definitionList && (
        <>
          {definitionList.length === 0 && (
            <div className="w-[310px]">
              タスク定義が未登録です。
              <Link href={TASK_REGISTER_PAGE_PATH} className={`${linkStyle()}`}>
                こちら
              </Link>
              から登録ができます。
            </div>
          )}
          {definitionList.length > 0 && (
            <div className="flex flex-col gap-5 min-w-[300px] max-w-[335px]">
              {definitionList.map((definition) => {
                return (
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    key={definition.id}
                  >
                    <div className="text-xl font-semibold break-all">
                      {definition.title}
                    </div>
                    {definition.detail && (
                      <div className="ml-3 mb-3 whitespace-pre-wrap break-all">
                        {definition.detail}
                      </div>
                    )}
                    <div>
                      チェック対象一覧：
                      {definition.displayFlag ? "表示" : "非表示"}
                    </div>
                    {definition.categoryId && (
                      <div>
                        カテゴリー：
                        {definition.categoryName}
                      </div>
                    )}
                    {definition.displayFlag && (
                      <div>
                        期限設定：
                        {getDeadLineCheckDisplay(
                          definition.deadLineCheck ?? undefined,
                          definition.deadLineCheckSubSetting ?? undefined
                        )}
                      </div>
                    )}
                    {userAccountState?.isLineBotFollow && (
                      <div>
                        LINE通知：
                        {definition.notificationFlag ? "あり" : "なし"}
                      </div>
                    )}
                    <div className="flex justify-center mt-3 gap-3">
                      <Button color="lime">実施履歴</Button>
                      <Button color="orange">編集</Button>
                      <Button
                        color="gray"
                        onClick={() => {
                          setDeleteTask(definition);
                        }}
                      >
                        定義削除
                      </Button>
                    </div>
                  </Card>
                );
              })}
              <TaskDefinitionDeleteModalComponent
                task={deleteTask}
                closeModal={() => {
                  setDeleteTask(undefined);
                }}
                refetch={refetchDefinitionList}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
