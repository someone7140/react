"use client";

import React, { FC, useState } from "react";
import { notifications } from "@mantine/notifications";
import { Button, Card } from "@mantine/core";

import { TaskExecutionWithMemoModalComponent } from "../modal/TaskExecutionWithMemoModalComponent";
import { TaskExecutionListModalComponent } from "../modal/TaskExecutionListModalComponent";
import {
  TaskCheckDisplayResponse,
  useCreateTaskExecuteMutation,
} from "@/graphql/gen/graphql";
import { useTaskUtil } from "@/hooks/useTaskUtil";

type Props = {
  checkTask: TaskCheckDisplayResponse;
};

export const TaskCheckCardComponent: FC<Props> = ({ checkTask }) => {
  const [checkTaskState, setCheckTaskState] = useState(checkTask);
  const [
    isOpenTaskExecutionWithMemoModal,
    setIsOpenTaskExecutionWithMemoModal,
  ] = useState<boolean>(false);
  const [isOpenTaskExecutionListModal, setIsOpenTaskExecutionListModal] =
    useState<boolean>(false);
  const [createTaskMutationResult, createTaskMutation] =
    useCreateTaskExecuteMutation();

  const { getDeadLineCheckDisplay } = useTaskUtil();
  const BUTTON_STYLE = {
    root: {
      height: "42px",
    },
  };

  const updateCheckTaskState = () => {
    // 最終実施日時と期限切れフラグを更新
    setCheckTaskState({
      ...checkTaskState,
      latestExecDateTime: new Date(),
      isExceedDeadLine: false,
    });
  };
  const executeTask = async () => {
    const result = await createTaskMutation({
      taskDefinitionId: checkTask.id,
    });
    if (!result?.data?.createTaskExecute || result.error) {
      notifications.show({
        id: "executeRegister-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "タスク実施",
        message: "タスク実施の登録に失敗しました",
        color: "red",
        loading: false,
      });
    } else {
      notifications.show({
        id: "executeRegister-success",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "タスク実施",
        message: "タスク実施の登録をしました",
        color: "green",
        loading: false,
      });
      updateCheckTaskState();
    }
  };

  const executeTaskWithMemo = async (memo?: string) => {
    const result = await createTaskMutation({
      taskDefinitionId: checkTask.id,
      memo: memo ?? null,
    });
    if (!result?.data?.createTaskExecute || result.error) {
      notifications.show({
        id: "executeRegister-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "タスク実施",
        message: "タスク実施の登録に失敗しました",
        color: "red",
        loading: false,
      });
    } else {
      notifications.show({
        id: "executeRegister-success",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "タスク実施",
        message: "タスク実施の登録をしました",
        color: "green",
        loading: false,
      });
      updateCheckTaskState();
      setIsOpenTaskExecutionWithMemoModal(false);
    }
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className="text-xl font-semibold break-all">
          {checkTaskState.title}
        </div>
        {checkTaskState.detail && (
          <div className="ml-3 mb-3 whitespace-pre-wrap break-all">
            {checkTaskState.detail}
          </div>
        )}
        <div>
          最終実施日時：
          {checkTaskState.latestExecDateTime
            ? checkTaskState.latestExecDateTime.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "未実施"}
        </div>
        {checkTaskState.deadLineCheck && checkTaskState.isExceedDeadLine && (
          <div className="font-bold text-red-600">期限超過</div>
        )}
        <div>
          期限設定：
          {getDeadLineCheckDisplay(
            checkTaskState.deadLineCheck ?? undefined,
            checkTaskState.deadLineCheckSubSetting ?? undefined
          )}
        </div>
        {checkTaskState.nextDeadLineDateTime && (
          <div>
            次回期限日時：
            {checkTaskState.nextDeadLineDateTime.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </div>
        )}
        {checkTaskState.categoryName && (
          <div>
            カテゴリー：
            {checkTaskState.categoryName}
          </div>
        )}
        <div className="flex justify-center mt-3 gap-3 items-stretch">
          <Button
            color="orange"
            onClick={executeTask}
            disabled={createTaskMutationResult.fetching}
            className="h-full"
            styles={BUTTON_STYLE}
          >
            実施
          </Button>
          <Button
            color="violet"
            disabled={createTaskMutationResult.fetching}
            styles={BUTTON_STYLE}
            onClick={() => {
              setIsOpenTaskExecutionWithMemoModal(true);
            }}
          >
            <div>
              実施
              <br />
              (メモ登録)
            </div>
          </Button>
          <Button
            color="lime"
            styles={BUTTON_STYLE}
            onClick={() => {
              setIsOpenTaskExecutionListModal(true);
            }}
          >
            実施履歴
          </Button>
        </div>
      </Card>
      {isOpenTaskExecutionWithMemoModal && (
        <TaskExecutionWithMemoModalComponent
          checkTask={checkTaskState}
          isOpen={isOpenTaskExecutionWithMemoModal}
          closeModal={() => {
            setIsOpenTaskExecutionWithMemoModal(false);
          }}
          execRegister={executeTaskWithMemo}
          submitDisabled={createTaskMutationResult.fetching}
        />
      )}
      {isOpenTaskExecutionListModal && (
        <TaskExecutionListModalComponent
          checkTask={checkTaskState}
          isOpen={isOpenTaskExecutionListModal}
          closeModal={() => {
            setIsOpenTaskExecutionListModal(false);
          }}
        />
      )}
    </>
  );
};
