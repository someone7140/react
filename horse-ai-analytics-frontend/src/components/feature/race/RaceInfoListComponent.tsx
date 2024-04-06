"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import { DeleteRaceInfoDialogComponent } from "@/components/feature/race/dialog/DeleteRaceInfoDialogComponent";
import { SearchRaceInfoDialogComponent } from "@/components/feature/race/dialog/SearchRaceInfoDialogComponent";
import { RaceInfoTitleComponent } from "@/components/feature/race/ref/RaceInfoTitleComponent";
import { toast } from "@/components/ui/use-toast";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";
import { Button } from "@/components/ui/button";
import {
  RaceInfoListFilterInputObject,
  useGetMyRaceInfoListQuery,
} from "@/query/graphqlGen/graphql";

export const RaceInfoListComponent: FC = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<
    RaceInfoListFilterInputObject | undefined
  >(undefined);
  const { data, loading, error, refetch } = useGetMyRaceInfoListQuery({
    variables: { filter },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "レース情報の取得に失敗しました。",
      });
    }
  }, [error]);

  const afterDeleteExec = () => {
    refetch();
    toast({
      className: `${toastStyle({ textColor: "black" })}`,
      variant: "default",
      description: "レース情報を削除しました。",
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-2">登録したレース情報一覧</div>
      <div className="mb-5">
        <SearchRaceInfoDialogComponent filter={filter} setFilter={setFilter} />
      </div>
      {(!data?.getMyRaceInfoList || data.getMyRaceInfoList.length == 0) && (
        <div>レース情報はありません</div>
      )}
      {data?.getMyRaceInfoList && data.getMyRaceInfoList.length > 0 && (
        <div className="flex flex-col gap-6 w-[100%]">
          {data.getMyRaceInfoList.map((race) => {
            return (
              <div key={race.id} className="flex flex-col gap-2">
                <RaceInfoTitleComponent
                  raceName={race.raceName}
                  raceDate={race.raceDate}
                />
                <div className="flex items-center gap-12">
                  <Link
                    href={`/race/raceInfoDetail?id=${race.id}`}
                    target="_blank"
                  >
                    <Button className={buttonStyle({ color: "indigo" })}>
                      詳細へ
                    </Button>
                  </Link>
                  <Button
                    className={buttonStyle({ color: "lime" })}
                    onClick={() => {
                      router.push(`/race/editRaceInfo?id=${race.id}`);
                    }}
                  >
                    編集
                  </Button>
                  <DeleteRaceInfoDialogComponent
                    raceId={race.id}
                    raceName={race.raceName}
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
