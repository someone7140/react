"use client";

import React, { FC } from "react";

import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import { Button } from "@/components/ui/button";
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
    console.log(theme);

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
        <div>{theme?.title}</div>
      </div>
    );
  }
};
