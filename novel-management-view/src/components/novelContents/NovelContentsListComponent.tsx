"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQuery } from "@apollo/client/react";

import { NovelContentsParentComponent } from "./contentsItem/NovelContentsParentComponent";
import { ParentNovelContentsRegisterDialogComponent } from "./dialog/ParentNovelContentsRegisterDialogComponent";
import { LoadingComponent } from "@/components/common/LoadingComponent";
import { Button } from "@/components/ui/button";
import { GetNovelContentsDocument } from "@/graphql/gen/graphql";
import { pageTitleStyle } from "@/style/CommonStyle";
import { submitButtonStyle } from "@/style/FormStyle";

type Props = {
  novelId: string;
};

export const NovelContentsListComponent: FC<Props> = ({ novelId }) => {
  const router = useRouter();
  const [
    isOpenParentNovelContentsRegisterDialog,
    setIsOpenParentNovelContentsRegisterDialog,
  ] = useState<boolean>(false);
  const { data, error, loading, refetch } = useQuery(GetNovelContentsDocument, {
    variables: { novelId: novelId },
    fetchPolicy: "network-only",
  });

  const onClickSetting = () => {
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

  const novel = data?.getMyNovelById;
  const novelContents = data?.getNovelContentsByNovelId ?? [];

  return (
    <div className="min-w-[500px]">
      {novel && <div className={pageTitleStyle()}>{novel.title}の執筆一覧</div>}
      {novelContents.length === 0 && (
        <>執筆が未登録です。新規執筆登録ボタンより登録ください。</>
      )}
      <div className="flex gap-3 mt-2 mb-3">
        <Button
          className={submitButtonStyle()}
          onClick={() => {
            setIsOpenParentNovelContentsRegisterDialog(true);
          }}
        >
          新規執筆登録
        </Button>
        <Button
          className="bg-green-500 cursor-pointer hover:bg-green-700"
          onClick={onClickSetting}
        >
          設定へ
        </Button>
        <Button className="bg-rose-500 cursor-pointer hover:bg-rose-700">
          AIプロンプト
        </Button>
        <Button
          onClick={() => {
            router.push(`/novel/list`);
          }}
        >
          小説一覧へ
        </Button>
      </div>
      {novelContents.length > 0 && (
        <div className="flex flex-col gap-3">
          {novelContents
            .filter((c) => !c.parentContentsId)
            .map((c) => (
              <NovelContentsParentComponent
                key={c.id}
                parentNovelContents={c}
                novelContents={novelContents}
                refetch={refetch}
              />
            ))}
        </div>
      )}
      {isOpenParentNovelContentsRegisterDialog && (
        <ParentNovelContentsRegisterDialogComponent
          isOpen={isOpenParentNovelContentsRegisterDialog}
          setIsOpen={setIsOpenParentNovelContentsRegisterDialog}
          novelId={novelId}
          refetch={refetch}
        />
      )}
    </div>
  );
};
