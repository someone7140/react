"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { Button, Card, Loader, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { TaskExecutionDeleteModalComponent } from "./TaskExecutionDeleteModalComponent";
import {
  TaskCheckDisplayResponse,
  TaskExecuteResponse,
  useGetTaskExecuteListByDefinitionIdQuery,
} from "@/graphql/gen/graphql";

type Props = {
  checkTask: TaskCheckDisplayResponse;
  isOpen: boolean;
  closeModal: () => void;
};

export const TaskExecutionListModalComponent: FC<Props> = ({
  checkTask,
  isOpen,
  closeModal,
}) => {
  const [{ data, fetching, error }, reexecuteQuery] =
    useGetTaskExecuteListByDefinitionIdQuery({
      variables: { taskDefinitionId: checkTask.id },
      requestPolicy: "network-only",
    });
  const [deleteTargetExecute, setDeleteTargetExecute] = useState<
    TaskExecuteResponse | undefined
  >(undefined);
  const [displayExecuteList, setDisplayExecuteList] = useState<
    TaskExecuteResponse[]
  >([]);
  const [displayHasMore, setDisplayHasMore] = useState<boolean>(true);
  const [isAddDisplayList, setIsAddDisplayList] = useState<boolean>(false);
  const loaderRef = useRef(null);
  const DISPLAY_UNIT = 10;

  const refetchExecuteList = () => {
    setDisplayExecuteList([]);
    setDisplayHasMore(true);
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  const updateDisplayHasMore = () => {
    const dataLen = data?.getTaskExecuteListByDefinitionId?.length ?? 0;
    if (dataLen <= displayExecuteList.length) {
      setDisplayHasMore(false);
    }
  };

  useEffect(() => {
    if (error) {
      notifications.show({
        id: "getTaskExecuteList-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "取得エラー",
        message: "実施履歴の取得に失敗しました",
        color: "red",
        loading: false,
      });
      closeModal();
    }
  }, [error, closeModal]);

  useEffect(() => {
    if (
      data?.getTaskExecuteListByDefinitionId &&
      data?.getTaskExecuteListByDefinitionId.length > 0
    ) {
      // リストの初期表示
      setDisplayExecuteList(
        data.getTaskExecuteListByDefinitionId.slice(0, DISPLAY_UNIT)
      );
      updateDisplayHasMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Intersection Observer の設定
  useEffect(() => {
    const currentLoaderRef = loaderRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayHasMore && !fetching) {
          if (
            data?.getTaskExecuteListByDefinitionId &&
            data?.getTaskExecuteListByDefinitionId.length > 0
          ) {
            setIsAddDisplayList(true);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayHasMore, fetching]);

  // リストの追加
  useEffect(() => {
    if (
      data?.getTaskExecuteListByDefinitionId &&
      data?.getTaskExecuteListByDefinitionId.length > 0 &&
      isAddDisplayList
    ) {
      const displayLen = displayExecuteList.length;
      const addList = data.getTaskExecuteListByDefinitionId.slice(
        displayLen,
        displayLen + DISPLAY_UNIT
      );
      setDisplayExecuteList([...displayExecuteList, ...addList]);
      updateDisplayHasMore();
      setIsAddDisplayList(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddDisplayList, data]);

  // リストの追加
  useEffect(() => {
    if (
      data?.getTaskExecuteListByDefinitionId &&
      data?.getTaskExecuteListByDefinitionId.length > 0 &&
      isAddDisplayList
    ) {
      const displayLen = displayExecuteList.length;
      const addList = data.getTaskExecuteListByDefinitionId.slice(
        displayLen,
        displayLen + DISPLAY_UNIT
      );
      setDisplayExecuteList([...displayExecuteList, ...addList]);
      updateDisplayHasMore();
      setIsAddDisplayList(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayExecuteList]);

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={`${checkTask.title}の実施履歴`}
      className="max-w-[310px] min-w-[310px]"
    >
      {fetching && <Loader size={30} />}
      {!fetching && displayExecuteList && (
        <>
          {displayExecuteList.length === 0 && <>実施履歴はありません。</>}
          {displayExecuteList.length > 0 && (
            <div className="flex flex-col gap-4 min-w-[300px] max-w-[335px]">
              {displayExecuteList.map((exec) => {
                return (
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    key={exec.id}
                    className="ml-3 min-w-[290px]"
                  >
                    <div>
                      実施日時：
                      {exec.executeDateTime.toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    {exec.memo && (
                      <div className="ml-3 mt-2 whitespace-pre-wrap break-all">
                        {exec.memo}
                      </div>
                    )}
                    <div className="flex justify-center mt-3 gap-3">
                      <Button
                        color="gray"
                        onClick={() => {
                          setDeleteTargetExecute(exec);
                        }}
                      >
                        実施履歴削除
                      </Button>
                    </div>
                  </Card>
                );
              })}
              <TaskExecutionDeleteModalComponent
                taskExec={deleteTargetExecute}
                closeModal={() => {
                  setDeleteTargetExecute(undefined);
                }}
                refetch={refetchExecuteList}
              />
            </div>
          )}
          <div ref={loaderRef}></div>
        </>
      )}
    </Modal>
  );
};
