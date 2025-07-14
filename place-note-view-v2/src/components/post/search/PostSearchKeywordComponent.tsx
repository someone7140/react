"use client";

import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "@heroui/react";

import { inputTextStyle } from "@/style/FormStyle";
import { PostListFilter } from "@/hooks/inputSessionStore/usePostFilterSessionStore";

type Props = {
  postFilter?: PostListFilter;
  keywordSelect: (keyword: string) => void;
};

export const PostSearchKeywordComponent: FC<Props> = ({
  postFilter,
  keywordSelect,
}) => {
  const [keyword, setKeyword] = useState<string>(postFilter?.keyword ?? "");

  const submitSearchPost = async () => {
    if (!keyword) {
      toast.error("キーワードを入力してください");
      return;
    }

    keywordSelect(keyword);
  };

  return (
    <div className="max-w-[90%] min-w-[320px]">
      <div className="flex flex-col gap-2 mb-3">
        <Input
          value={keyword}
          className={inputTextStyle()}
          onChange={(e) => {
            {
              setKeyword(e.target.value);
            }
          }}
          label="キーワード"
        />
        <Button
          className="w-[80px] pl-1 pr-1"
          onPress={() => {
            submitSearchPost();
          }}
          color="primary"
        >
          検索
        </Button>
      </div>
    </div>
  );
};
