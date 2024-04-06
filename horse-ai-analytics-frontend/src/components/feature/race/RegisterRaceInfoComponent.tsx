"use client";

import React, { FC } from "react";

import { useRouter } from "next/navigation";
import { z } from "zod";

import {
  AnalyticsRaceInputComponent,
  analyticsRaceInputFormSchema,
} from "@/components/feature/race/input/AnalyticsRaceInputComponent";
import { toast } from "@/components/ui/use-toast";
import { useAddRaceInfoMutation } from "@/query/graphqlGen/graphql";
import { toastStyle } from "@/styles/CommonStyle";

export const RegisterRaceInfoComponent: FC = () => {
  const router = useRouter();

  const [addRaceInfoMutation, { loading: loadingAddRaceInfoMutation }] =
    useAddRaceInfoMutation();

  const submitFunc = async (
    data: z.infer<typeof analyticsRaceInputFormSchema>
  ) => {
    const result = await addRaceInfoMutation({
      variables: {
        raceName: data.raceName,
        analyticsUrl: data.analyticsUrl,
        raceDate: data.raceDate.toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        prompt: data.prompt,
        memoList: data.memoList.filter((memo) => memo.contents || memo.title),
      },
    });
    if (result.data) {
      toast({
        className: `${toastStyle({ textColor: "black" })}`,
        variant: "default",
        description: "レース情報を登録しました",
      });
      router.push("/race/raceInfoList");
    } else {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "レース情報の登録に失敗しました。",
      });
    }
  };

  return (
    <AnalyticsRaceInputComponent
      submitFunc={submitFunc}
      registerDisabled={loadingAddRaceInfoMutation}
    />
  );
};
