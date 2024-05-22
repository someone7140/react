"use client";

import React, { FC, useEffect } from "react";

import { useRouter } from "next/navigation";
import { z } from "zod";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import {
  AnalyticsRaceInputComponent,
  analyticsRaceInputFormSchema,
} from "@/components/feature/race/input/AnalyticsRaceInputComponent";
import { toast } from "@/components/ui/use-toast";
import {
  useEditRaceInfoMutation,
  useGetRaceInfoDetailQuery,
} from "@/query/graphqlGen/graphql";
import { toastStyle } from "@/styles/CommonStyle";

type Props = {
  raceInfoId: string;
};

export const EditRaceInfoComponent: FC<Props> = ({ raceInfoId }) => {
  const router = useRouter();
  const {
    data: detail,
    loading: detailLoading,
    error: detailError,
  } = useGetRaceInfoDetailQuery({
    variables: { raceInfoId },
    fetchPolicy: "network-only",
  });
  const [editRaceInfoMutation, { loading: loadingAddRaceInfoMutation }] =
    useEditRaceInfoMutation();

  useEffect(() => {
    if (detailError) {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "レース情報の取得に失敗しました。",
      });
      router.push("/race/raceInfoList");
    }
  }, [detailError, router]);

  const submitFunc = async (
    data: z.infer<typeof analyticsRaceInputFormSchema>
  ) => {
    if (detail?.getRaceInfoDetail) {
      const result = await editRaceInfoMutation({
        variables: {
          id: raceInfoId,
          raceName: data.raceName,
          analyticsUrl: data.analyticsUrl,
          raceDate: data.raceDate.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          prompt: data.prompt,
          memoList: data.memoList
            .filter((memo) => memo.contents || memo.title)
            .map((memo) => {
              return {
                id: memo.memoId,
                title: memo.title,
                contents: memo.contents,
                evaluation: memo.evaluation,
                categoryId:
                  memo.categoryId === "dummy" ? undefined : memo.categoryId,
              };
            }),
        },
      });
      if (result.data) {
        toast({
          className: `${toastStyle({ textColor: "black" })}`,
          variant: "default",
          description: "レース情報を編集しました",
        });
        router.push("/race/raceInfoList");
      } else {
        toast({
          className: `${toastStyle({ textColor: "amber" })}`,
          variant: "destructive",
          description: "レース情報の編集に失敗しました。",
        });
      }
    }
  };

  if (detailLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {detail?.getRaceInfoDetail && (
        <>
          <div className="mb-2">レース情報の編集</div>
          <AnalyticsRaceInputComponent
            submitFunc={submitFunc}
            registerDisabled={loadingAddRaceInfoMutation}
            raceInfo={detail.getRaceInfoDetail}
          />
        </>
      )}
    </>
  );
};
