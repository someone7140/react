"use client";

import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useMutation, useQuery } from "@apollo/client/react";

import { NovelDeleteDialogComponent } from "./dialog/NovelDeleteDialogComponent";
import {
  NovelInputDialogComponent,
  NovelInputFormType,
} from "./dialog/NovelInputDialogComponent";
import { LoadingComponent } from "@/components/common/LoadingComponent";
import { Button } from "@/components/ui/button";
import {
  AddNovelDocument,
  DeleteNovelDocument,
  EditNovelDocument,
  GetMyNovelsDocument,
  NovelResponse,
} from "@/graphql/gen/graphql";
import {
  deleteButtonStyle,
  editButtonStyle,
  settingButtonStyle,
  submitButtonStyle,
} from "@/style/FormStyle";
import { novelDescriptionStyle, novelTitleStyle } from "@/style/NovelStyle";

export const NovelListComponentComponent: FC = () => {
  const router = useRouter();
  const [isOpenAddNovelDialog, setIsOpenAddNovelDialog] =
    useState<boolean>(false);
  const [editNovelTarget, setEditNovelTarget] = useState<
    NovelResponse | undefined
  >(undefined);
  const [deleteNovelTarget, setDeleteNovelTarget] = useState<
    NovelResponse | undefined
  >(undefined);
  const { data, error, loading, refetch } = useQuery(GetMyNovelsDocument, {
    fetchPolicy: "network-only",
  });
  const [addNovel, { loading: addNovelLoading }] =
    useMutation(AddNovelDocument);
  const [editNovel, { loading: editNovelLoading }] =
    useMutation(EditNovelDocument);
  const [deleteNovel, { loading: deleteNovelLoading }] =
    useMutation(DeleteNovelDocument);

  const execAddNovel = async (input: NovelInputFormType) => {
    const result = await addNovel({
      variables: {
        title: input.title,
        description: input.description,
      },
    });

    if (result.error) {
      toast.error("登録エラーが発生しました");
    } else {
      refetch();
      toast.info("登録しました");
    }

    setIsOpenAddNovelDialog(false);
  };

  const execEditNovel = async (input: NovelInputFormType) => {
    if (editNovelTarget) {
      const result = await editNovel({
        variables: {
          id: editNovelTarget.id,
          title: input.title,
          description: input.description,
        },
      });

      if (result.error) {
        toast.error("編集時にエラーが発生しました");
      } else {
        refetch();
        toast.info("編集しました");
      }
    }
    setEditNovelTarget(undefined);
  };

  const execDeleteNovel = async () => {
    if (deleteNovelTarget) {
      const result = await deleteNovel({
        variables: {
          id: deleteNovelTarget.id,
        },
      });

      if (result.error) {
        toast.error("削除時にエラーが発生しました");
      } else {
        refetch();
        toast.info("削除しました");
      }
    }
    setDeleteNovelTarget(undefined);
  };

  const onClickSetting = (novelId: string) => {
    router.push(`/novelSetting/list?novelId=${novelId}`);
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
          {novels.map((novel) => (
            <div key={novel.id}>
              <div className={`${novelTitleStyle()} mb-2`}>{novel.title}</div>
              {novel.description && (
                <div className={`${novelDescriptionStyle()} mb-2 ml-3`}>
                  {novel.description}
                </div>
              )}
              <div className="flex gap-4 ml-3">
                <Button
                  className={editButtonStyle()}
                  onClick={() => {
                    setEditNovelTarget(novel);
                  }}
                >
                  タイトル・概要編集
                </Button>
                <Button className="bg-green-500 cursor-pointer hover:bg-green-700">
                  執筆
                </Button>
                <Button
                  className={settingButtonStyle()}
                  onClick={() => {
                    onClickSetting(novel.id);
                  }}
                >
                  設定
                </Button>
                <Button className="bg-rose-500 cursor-pointer hover:bg-rose-700">
                  エクスポート
                </Button>
                <Button
                  className={deleteButtonStyle()}
                  onClick={() => {
                    setDeleteNovelTarget(novel);
                  }}
                >
                  削除
                </Button>
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
      {editNovelTarget && (
        <NovelInputDialogComponent
          isOpen={!!editNovelTarget}
          setIsOpen={(isOpen: boolean) => {
            if (!isOpen) {
              setEditNovelTarget(undefined);
            }
          }}
          disabledFlag={editNovelLoading}
          onSubmit={execEditNovel}
          registeredNovel={editNovelTarget}
        />
      )}
      {deleteNovelTarget && (
        <NovelDeleteDialogComponent
          isOpen={!!deleteNovelTarget}
          setIsOpen={(isOpen: boolean) => {
            if (!isOpen) {
              setDeleteNovelTarget(undefined);
            }
          }}
          disabledFlag={deleteNovelLoading}
          onSubmit={execDeleteNovel}
          registeredNovel={deleteNovelTarget}
        />
      )}
    </>
  );
};
