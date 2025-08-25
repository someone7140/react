"use client";

import React, { FC, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  NovelInputDialogComponent,
  NovelInputFormType,
} from "./dialog/NovelInputDialogComponent";
import { LoadingComponent } from "@/components/common/LoadingComponent";
import { Button } from "@/components/ui/button";
import {
  useAddNovelMutation,
  useGetMyNovelsQuery,
} from "@/graphql/gen/graphql";
import {
  deleteButtonStyle,
  editButtonStyle,
  submitButtonStyle,
} from "@/style/FormStyle";

export const NovelListComponentComponent: FC = () => {
  const [isOpenAddNovelDialog, setIsOpenAddNovelDialog] =
    useState<boolean>(false);
  const { data, error, loading, refetch } = useGetMyNovelsQuery({
    fetchPolicy: "network-only",
  });
  const [addNovel, { loading: addNovelLoading }] = useAddNovelMutation();

  const execAddNovel = async (input: NovelInputFormType) => {
    try {
      const result = await addNovel({
        variables: {
          title: input.title,
          description: input.description,
        },
      });

      if (result.errors) {
        toast.error("登録エラーが発生しました");
      } else {
        refetch();
        toast.info("登録しました");
      }
    } catch {
      toast.error("登録エラーが発生しました");
    }
    setIsOpenAddNovelDialog(false);
  };

  useEffect(() => {
    if (error) {
      toast.error("取得時にエラーが発生しました");
    }
  }, [error]);

  if (loading) {
    return <LoadingComponent />;
  }

  const novels = data?.getMyNovels ?? [];

  return (
    <>
      {novels.length === 0 && (
        <>小説が未登録です。新規小説登録ボタンより登録ください。</>
      )}
      {novels.length > 0 && (
        <div className="flex flex-col gap-3">
          {novels.map((n) => (
            <div key={n.id}>
              <div className="mb-2 text-xl whitespace-pre-wrap text-wrap break-all w-[95%]">
                {n.title}
              </div>
              {n.description && (
                <div className="mb-2 ml-3 whitespace-pre-wrap text-wrap text-gray-600 break-all w-[80%] text-sm">
                  {n.description}
                </div>
              )}
              <div className="flex gap-4 ml-3">
                <Button className="bg-green-500 cursor-pointer hover:bg-green-700">
                  執筆
                </Button>
                <Button className="bg-purple-500 cursor-pointer hover:bg-purple-700">
                  設定
                </Button>
                <Button className="bg-rose-500 cursor-pointer hover:bg-rose-700">
                  エクスポート
                </Button>
                <Button className={editButtonStyle()}>
                  タイトル・概要編集
                </Button>
                <Button className={deleteButtonStyle()}>削除</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-5">
        <Button
          className={submitButtonStyle()}
          onClick={() => {
            setIsOpenAddNovelDialog(true);
          }}
        >
          新規小説登録
        </Button>
      </div>
      {isOpenAddNovelDialog && (
        <NovelInputDialogComponent
          isOpen={isOpenAddNovelDialog}
          setIsOpen={setIsOpenAddNovelDialog}
          disabledFlag={addNovelLoading}
          onSubmit={execAddNovel}
        />
      )}
    </>
  );
};
