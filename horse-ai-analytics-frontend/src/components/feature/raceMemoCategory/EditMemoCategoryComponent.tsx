"use client";

import React, { FC, useEffect } from "react";

import { useRouter } from "next/navigation";
import { z } from "zod";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import {
  RaceMemoCategoryInputComponent,
  raceMemoCategoryFormSchema,
} from "@/components/feature/raceMemoCategory/input/RaceMemoCategoryInputComponent";
import { toast } from "@/components/ui/use-toast";
import {
  useEditMemoCategoryMutation,
  useGetRaceMemoCategoryListQuery,
} from "@/query/graphqlGen/graphql";
import { toastStyle } from "@/styles/CommonStyle";

type Props = {
  categoryId: string;
};

export const EditMemoCategoryComponent: FC<Props> = ({ categoryId }) => {
  const router = useRouter();
  const {
    data: memoData,
    loading: memoDataLoading,
    error: memoDataError,
  } = useGetRaceMemoCategoryListQuery({
    variables: { idFilter: categoryId },
    fetchPolicy: "network-only",
  });
  const [
    editMemoCategoryMutation,
    { loading: loadingEditMemoCategoryMutation },
  ] = useEditMemoCategoryMutation();

  useEffect(() => {
    if (memoDataError) {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "カテゴリー情報の取得に失敗しました。",
      });
      router.push("/race/memoCategory/categoryList");
    }
  }, [memoDataError, router]);

  const submitFunc = async (
    data: z.infer<typeof raceMemoCategoryFormSchema>
  ) => {
    const result = await editMemoCategoryMutation({
      variables: {
        id: categoryId,
        name: data.name,
        displayOrder: data.displayOrder,
      },
    });
    if (result.data) {
      toast({
        className: `${toastStyle({ textColor: "black" })}`,
        variant: "default",
        description: "カテゴリーを編集しました",
      });
      router.push("/race/memoCategory/categoryList");
    } else {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "カテゴリーの編集に失敗しました。",
      });
    }
  };

  if (memoDataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {memoData?.getRaceMemoCategoryList &&
        memoData.getRaceMemoCategoryList.length > 0 && (
          <>
            <div className="mb-2">カテゴリー情報の編集</div>
            <RaceMemoCategoryInputComponent
              submitFunc={submitFunc}
              registerDisabled={loadingEditMemoCategoryMutation}
              category={memoData.getRaceMemoCategoryList[0]}
            />
          </>
        )}
    </>
  );
};
