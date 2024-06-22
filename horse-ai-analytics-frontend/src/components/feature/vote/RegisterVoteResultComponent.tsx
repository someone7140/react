"use client";

import React, { FC } from "react";

import { useRouter } from "next/navigation";
import { z } from "zod";

import {
  RegisterVoteInputComponent,
  voteResultInputFormSchema,
} from "@/components/feature/vote/input/RegisterVoteInputComponent";
import { toast } from "@/components/ui/use-toast";
import { useFormCommonUtil } from "@/hooks/useFormCommonUtil";
import { useAddVoteResultMutation } from "@/query/graphqlGen/graphql";
import { toastStyle } from "@/styles/CommonStyle";

export const RegisterVoteResultComponent: FC = () => {
  const router = useRouter();

  const [addVoteResultMutation, { loading: loadingAddVoteResultMutation }] =
    useAddVoteResultMutation();
  const { dateToString } = useFormCommonUtil();

  const submitFunc = async (
    data: z.infer<typeof voteResultInputFormSchema>
  ) => {
    const result = await addVoteResultMutation({
      variables: {
        input: {
          raceDate: dateToString(data.raceDate),
          voteRaceList: data.voteRaceList
            .filter((r) => r.raceId !== "dummy")
            .map((r) => {
              return {
                raceId: r.raceId,
                voteRaceContents: r.voteRaceContents.map((c) => {
                  return {
                    id: undefined,
                    contents: c.contents,
                    mostPriorityMemoId: c.mostPriorityMemoId,
                    betAmount: c.betAmount,
                    returnAmount: c.returnAmount,
                  };
                }),
              };
            }),
        },
      },
    });
    if (result.data) {
      toast({
        className: `${toastStyle({ textColor: "black" })}`,
        variant: "default",
        description: "投票情報を登録しました",
      });
      router.push("/vote/voteResultList");
    } else {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "投票情報の登録に失敗しました。",
      });
    }
  };

  return (
    <>
      <div className="mb-2">投票情報の登録</div>
      <RegisterVoteInputComponent
        submitFunc={submitFunc}
        registerDisabled={loadingAddVoteResultMutation}
      />
    </>
  );
};
