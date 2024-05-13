"use client";

import React, { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import { DeleteRaceMemoCategoryComponent } from "@/components/feature/raceMemoCategory/dialog/DeleteRaceMemoCategoryComponent";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useGetRaceMemoCategoryListQuery } from "@/query/graphqlGen/graphql";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";

export const RaceMemoCategoryListComponent: FC = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useGetRaceMemoCategoryListQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "カテゴリー情報の取得に失敗しました。",
      });
    }
  }, [error]);

  const afterDeleteExec = () => {
    refetch();
    toast({
      className: `${toastStyle({ textColor: "black" })}`,
      variant: "default",
      description: "カテゴリー情報を削除しました。",
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-2">登録したカテゴリー一覧</div>
      {(!data?.getRaceMemoCategoryList ||
        data.getRaceMemoCategoryList.length == 0) && (
        <div>カテゴリー情報はありません</div>
      )}
      {data?.getRaceMemoCategoryList &&
        data.getRaceMemoCategoryList.length > 0 && (
          <div className="flex flex-col gap-6 w-[100%]">
            {data?.getRaceMemoCategoryList.map((category) => {
              return (
                <div key={category.id} className="flex flex-col gap-2">
                  <div className="break-all text-xl">{category.name}</div>
                  <div className="flex items-center gap-12">
                    <Button
                      className={buttonStyle({ color: "lime" })}
                      onClick={() => {
                        router.push(
                          `/race/memoCategory/editCategory?id=${category.id}`
                        );
                      }}
                    >
                      編集
                    </Button>
                    <DeleteRaceMemoCategoryComponent
                      id={category.id}
                      name={category.name}
                      afterDeleteExec={afterDeleteExec}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
};
