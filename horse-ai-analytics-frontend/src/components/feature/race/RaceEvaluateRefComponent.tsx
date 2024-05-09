"use client";

import React, { FC, useState } from "react";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import { SearchRaceEvaluateDialogComponent } from "@/components/feature/race/dialog/SearchRaceEvaluateDialogComponent";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  GetRaceEvaluationQueryVariables,
  useGetRaceEvaluationQuery,
} from "@/query/graphqlGen/graphql";

export const RaceEvaluateRefComponent: FC = () => {
  const [filter, setFilter] = useState<
    GetRaceEvaluationQueryVariables | undefined
  >(undefined);

  const { data, loading } = useGetRaceEvaluationQuery({
    variables: filter,
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="mb-2">登録したレースの回答評価</div>
      <div className="mb-5">
        <SearchRaceEvaluateDialogComponent
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      {(!data?.getRaceEvaluation || data.getRaceEvaluation.length == 0) && (
        <div>回答評価はありません</div>
      )}
      {data?.getRaceEvaluation && data.getRaceEvaluation.length > 0 && (
        <div className="flex flex-col gap-6 w-[100%]">
          {data?.getRaceEvaluation.map((evaluation) => {
            return (
              <Card key={evaluation.title} className="ml-2 w-[100%]">
                <CardTitle className="ml-4 mb-3 mt-4">
                  {evaluation.title}
                </CardTitle>
                <CardContent className="flex flex-col gap-2">
                  <Label>・平均値：{evaluation.average}</Label>
                  <Label>・中央値：{evaluation.median}</Label>
                  <Label>・登録件数：{evaluation.count}</Label>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};
