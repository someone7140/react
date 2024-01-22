"use client";

import React, { FC } from "react";

import { ChevronsUpDown, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";

type Props = {
  key: string;
  contents: string;
};

export const QuestionDisplayComponent: FC<Props> = ({ key, contents }) => {
  const handleCopyText = async () => {
    await global.navigator.clipboard.writeText(contents);
    toast({
      className: `${toastStyle({ textColor: "black" })}`,
      description: "質問をコピーしました。",
    });
  };

  return (
    <Card className="w-[100%] min-w-[330px]">
      <CardContent>
        <div className="flex gap-3 mt-2">
          <div className="w-[100%] break-all">{contents}</div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {}}
              className={buttonStyle({ color: "lime" })}
            >
              <p>質問編集</p>
            </Button>
            <Button
              onClick={() => {}}
              className={buttonStyle({ color: "gray" })}
            >
              <p>質問削除</p>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-9 p-0"
              onClick={handleCopyText}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
