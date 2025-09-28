"use client";

import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQuery } from "@apollo/client/react";

import { ParentNovelSettingRegisterDialogComponent } from "./dialog/ParentNovelSettingRegisterDialogComponent";
import { NovelSettingParentComponent } from "./display/NovelSettingParentComponent";
import { LoadingComponent } from "@/components/common/LoadingComponent";
import { Button } from "@/components/ui/button";
import { GetNovelSettingsDocument } from "@/graphql/gen/graphql";
import { pageTitleStyle } from "@/style/CommonStyle";
import { submitButtonStyle } from "@/style/FormStyle";

type Props = {
  novelId: string;
};

export const NovelSettingListComponent: FC<Props> = ({ novelId }) => {
  const router = useRouter();
  const [
    isOpenParentNovelSettingRegisterDialog,
    setIsOpenParentNovelSettingRegisterDialog,
  ] = useState<boolean>(false);
  const { data, error, loading, refetch } = useQuery(GetNovelSettingsDocument, {
    variables: { novelId: novelId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      toast.error("取得時にエラーが発生しました");
    }
  }, [error]);

  if (loading) {
    return <LoadingComponent />;
  }

  const novel = data?.getMyNovelById;
  const novelsSettings = data?.getMyNovelSettings ?? [];

  return (
    <>
      {novel && <div className={pageTitleStyle()}>{novel.title}の設定一覧</div>}
      {novelsSettings.length === 0 && (
        <>設定が未登録です。新規設定登録ボタンより登録ください。</>
      )}
      {novelsSettings.length > 0 && (
        <div className="flex flex-col gap-3">
          {novelsSettings
            .filter((s) => !s.parentSettingId)
            .map((s) => (
              <NovelSettingParentComponent
                key={s.id}
                parentNovelSetting={s}
                novelsSettings={novelsSettings}
              />
            ))}
        </div>
      )}
      <div className="flex gap-3 mt-5">
        <Button
          className={submitButtonStyle()}
          onClick={() => {
            setIsOpenParentNovelSettingRegisterDialog(true);
          }}
        >
          新規設定登録
        </Button>
        <Button className="bg-green-500 cursor-pointer hover:bg-green-700">
          執筆へ
        </Button>
        <Button
          onClick={() => {
            router.push(`/novel/list`);
          }}
        >
          小説一覧へ
        </Button>
      </div>
      {isOpenParentNovelSettingRegisterDialog && (
        <ParentNovelSettingRegisterDialogComponent
          isOpen={isOpenParentNovelSettingRegisterDialog}
          setIsOpen={setIsOpenParentNovelSettingRegisterDialog}
          novelId={novelId}
          refetch={refetch}
        />
      )}
    </>
  );
};
