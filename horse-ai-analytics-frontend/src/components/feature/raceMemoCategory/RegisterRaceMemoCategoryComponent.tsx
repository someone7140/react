"use client";

import React, { FC } from "react";

import { useRouter } from "next/navigation";
import { z } from "zod";

import {
  RaceMemoCategoryInputComponent,
  raceMemoCategoryFormSchema,
} from "@/components/feature/raceMemoCategory/input/RaceMemoCategoryInputComponent";
import { toast } from "@/components/ui/use-toast";
import { useAddMemoCategoryMutation } from "@/query/graphqlGen/graphql";
import { toastStyle } from "@/styles/CommonStyle";

export const RegisterRaceMemoCategoryComponent: FC = () => {
  const router = useRouter();

  const [addMemoCategoryMutation, { loading: loadingAddMemoCategoryMutation }] =
    useAddMemoCategoryMutation();

  const submitFunc = async (
    data: z.infer<typeof raceMemoCategoryFormSchema>
  ) => {
    const result = await addMemoCategoryMutation({
      variables: {
        name: data.name,
        displayOrder: data.displayOrder,
      },
    });
    if (result.data) {
      toast({
        className: `${toastStyle({ textColor: "black" })}`,
        variant: "default",
        description: "カテゴリーを登録しました",
      });
      router.push("/race/memoCategory/categoryList");
    } else {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "カテゴリーの登録に失敗しました。",
      });
    }
  };

  return (
    <>
      <div className="mb-2">カテゴリー情報の登録</div>
      <RaceMemoCategoryInputComponent
        submitFunc={submitFunc}
        registerDisabled={loadingAddMemoCategoryMutation}
      />
    </>
  );
};
