"use client";

import React, { FC } from "react";

import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import { QuestionDisplayComponent } from "@/components/feature/prompt/question/QuestionDisplayComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useGetThemeByIdDocumentQuery } from "@/query/graphqlGen/graphql";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";

type Props = {
  id: string;
};

export const ThemeByIdComponent: FC<Props> = ({ id }) => {
  const router = useRouter();
  const { data, loading, error } = useGetThemeByIdDocumentQuery({
    variables: { id },
    fetchPolicy: "no-cache",
  });

  if (loading) {
    return <LoadingSpinner />;
  } else if ((data?.problem_themes?.length ?? 0) < 1 || error) {
    toast({
      className: `${toastStyle({ textColor: "amber" })}`,
      variant: "destructive",
      description: "課題テーマが取得できませんでした。",
    });
    router.push("/");
    return <></>;
  } else {
    const theme = data?.problem_themes[0];
    const questions = data?.problem_themes[0]?.problem_questions ?? [];

    return (
      <div>
        <div className="flex gap-3 mb-3">
          <Button
            onClick={() => {
              router.push("/prompt/theme/list");
            }}
            className={buttonStyle({ color: "gray" })}
          >
            <p>テーマ一覧へ</p>
          </Button>
          <Button
            onClick={() => {
              router.push(`/prompt/question/add?themeId=${id}`);
            }}
            className={buttonStyle({ color: "indigo" })}
          >
            <p>質問追加</p>
          </Button>
        </div>
        <div className="mb-3">
          <Card className="w-[100%] min-w-[330px]">
            <CardHeader>
              <CardTitle className="break-all">{theme?.title}</CardTitle>
              <CardDescription className="break-all">
                {theme?.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        {questions.length == 0 && <div>質問は未登録です</div>}
        {questions.length > 0 && (
          <div className="flex flex-col gap-3">
            {questions.map((q) => {
              return (
                <QuestionDisplayComponent key={q.id} contents={q.contents} />
              );
            })}
          </div>
        )}
      </div>
    );
  }
};
