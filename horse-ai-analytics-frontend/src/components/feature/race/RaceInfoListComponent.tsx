"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { useInfiniteScroll } from "ahooks";
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
  GetMyRaceInfoListQuery,
  RaceInfoListFilterInputObject,
  useGetMyRaceInfoListQuery,
} from "@/query/graphqlGen/graphql";

interface DisplayResult {
  list: GetMyRaceInfoListQuery["getMyRaceInfoList"];
  nextId: string | undefined;
}

export const RaceInfoListComponent: FC = () => {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<
    RaceInfoListFilterInputObject | undefined
  >(undefined);
  const { data, loading, error, refetch } = useGetMyRaceInfoListQuery({
    variables: { filter },
    fetchPolicy: "network-only",
  });

  const getLoadMoreList = (
    nextId: string | undefined,
    limit: number
  ): Promise<DisplayResult> => {
    let displayResult: DisplayResult = {
      list: [],
      nextId: undefined,
    };

    if (data?.getMyRaceInfoList) {
      let start = 0;
      if (nextId) {
        start =
          data.getMyRaceInfoList.findIndex((race) => race.id === nextId) ?? 0;
      }
      const end = start + limit;
      const list = data.getMyRaceInfoList.slice(start, end);
      const nextInfo =
        data.getMyRaceInfoList.length >= end
          ? data.getMyRaceInfoList[end]
          : undefined;
      displayResult = { list, nextId: nextInfo?.id };
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(displayResult);
      }, 100);
    });
  };

  const {
    data: displayData,
    loadingMore,
    noMore,
    reload,
  } = useInfiniteScroll((d) => getLoadMoreList(d?.nextId, 10), {
    target: listRef,
    isNoMore: (d) => d?.nextId === undefined,
  });

  useEffect(() => {
    if (data?.getMyRaceInfoList) {
      reload();
    }
  }, [data, reload]);

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
        <div
          className="flex flex-col gap-6 w-[100%] h-[500px] overflow-auto"
          ref={listRef}
        >
          {displayData?.list.map(
            (race: GetMyRaceInfoListQuery["getMyRaceInfoList"][0]) => {
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
            }
          )}
          {!noMore && loadingMore && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
};
