"use client";

import React, { FC, useEffect, useRef, useState } from "react";

import { ChevronsUpDown, Copy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import { DeleteRaceInfoDialogComponent } from "@/components/feature/race/dialog/DeleteRaceInfoDialogComponent";
import { AnalyticsRaceOddsTableComponent } from "@/components/feature/race/ref/AnalyticsRaceOddsTableComponent";
import { RaceInfoTitleComponent } from "@/components/feature/race/ref/RaceInfoTitleComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useRaceInfoCommonUtil } from "@/hooks/useRaceInfoCommonUtil";
import { useGetRaceInfoDetailQuery } from "@/query/graphqlGen/graphql";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";

type Props = {
  raceInfoId: string;
};

export const RaceInfoDetailComponent: FC<Props> = ({ raceInfoId }) => {
  const router = useRouter();
  const { data, loading, error } = useGetRaceInfoDetailQuery({
    variables: { raceInfoId },
    fetchPolicy: "network-only",
  });
  const [isOpenPrompt, setIsOpenPrompt] = useState<boolean>(false);
  const [isDisplayCollapsible, setIsDisplayCollapsible] =
    useState<boolean>(false);
  const promptContentRef = useRef<HTMLDivElement>(null);
  const { copyToClipboard } = useRaceInfoCommonUtil();

  useEffect(() => {
    if (!loading && promptContentRef && promptContentRef.current) {
      setIsDisplayCollapsible(
        promptContentRef.current.scrollHeight >
          promptContentRef.current.clientHeight
      );
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "レース情報の取得に失敗しました。",
      });
      router.push("/race/raceInfoList");
    }
  }, [error, router]);

  const afterDeleteExec = () => {
    toast({
      className: `${toastStyle({ textColor: "black" })}`,
      variant: "default",
      description: "レース情報を削除しました。",
    });
    router.push("/race/raceInfoList");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const detail = data?.getRaceInfoDetail;
  const categoryList = data?.getRaceMemoCategoryList;

  return (
    <>
      {detail && (
        <div className="flex flex-col gap-3 w-[100%]">
          <RaceInfoTitleComponent
            raceName={detail.raceName}
            raceDate={detail.raceDate}
          />
          {detail.analyticsUrl && (
            <Link
              className="no-underline hover:underline text-sky-400"
              href={detail.analyticsUrl}
              target="_blank"
            >
              出馬表へ
            </Link>
          )}
          {detail.odds && (
            <AnalyticsRaceOddsTableComponent oddsInfo={detail.odds} />
          )}
          {detail.prompt && (
            <div>
              <div className="flex flex-row gap-4 items-center">
                <Label>プロンプト</Label>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    copyToClipboard(detail.prompt ?? "", "プロンプト");
                  }}
                >
                  <Copy />
                </div>
              </div>
              <Card className="ml-2 mt-2 w-[95%]">
                <CardContent>
                  <Collapsible
                    open={isOpenPrompt}
                    onOpenChange={setIsOpenPrompt}
                  >
                    {isDisplayCollapsible && (
                      <div className="flex flex-row justify-end">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-9 p-0">
                            <ChevronsUpDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    )}
                    <div
                      ref={promptContentRef}
                      className={
                        !isOpenPrompt
                          ? "whitespace-pre-wrap line-clamp-3 mt-3"
                          : "whitespace-pre-wrap mt-3"
                      }
                    >
                      {detail.prompt}
                    </div>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
          )}
          {detail.memoList.length > 0 && (
            <div>
              <Label className="mb-2">メモ</Label>
              <div className="flex flex-col gap-3 w-[95%]">
                {detail.memoList.map((memo) => {
                  return (
                    <Card key={memo.id} className="ml-2 w-[100%]">
                      <CardTitle className="ml-4 mb-3 mt-4">
                        {memo.title}
                      </CardTitle>
                      <CardContent>
                        <Label className="mb-2">＜内容＞</Label>
                        <div className="whitespace-pre-wrap ml-2 mb-2">
                          {memo.contents}
                        </div>
                        {memo.categoryId != null && (
                          <>
                            <Label className="mb-2">＜カテゴリー＞</Label>
                            <div className="ml-2 mb-2">
                              {
                                categoryList?.find(
                                  (c) => c.id === memo.categoryId
                                )?.name
                              }
                            </div>
                          </>
                        )}
                        {memo.evaluation != null && (
                          <>
                            <Label className="mb-2">＜評価値＞</Label>
                            <div className="ml-2">{memo.evaluation}</div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex flex-row justify-center items-center gap-8 mt-3">
            <Button
              className={buttonStyle({ color: "lime" })}
              onClick={() => {
                router.push(`/race/editRaceInfo?id=${detail.id}`);
              }}
            >
              編集
            </Button>
            <DeleteRaceInfoDialogComponent
              raceId={detail.id}
              raceName={detail.raceName}
              afterDeleteExec={afterDeleteExec}
            />
          </div>
        </div>
      )}
    </>
  );
};
