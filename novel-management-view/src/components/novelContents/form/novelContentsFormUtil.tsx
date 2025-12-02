"use client";

import z from "zod";

import { NovelContentsResponse } from "@/graphql/gen/graphql";

export const novellContentsInputFormSchema = z.object({
  id: z.string().optional(),
  chapterName: z.string().min(1, {
    message: "見出しは必須です",
  }),
  displayOrder: z.string().refine((val) => {
    if (val === "") return true;
    const num = Number(val);
    return !isNaN(num) && Number.isInteger(num);
  }, "数値を入力してください"),
  description: z.string(),
  contents: z.string(),
});

export type NovelContentsInputFormType = z.infer<
  typeof novellContentsInputFormSchema
>;

// 執筆のレスポンスからインプット用の型に変換する関数
export const convertContentsInputFromResponse = (
  res: NovelContentsResponse
): NovelContentsInputFormType => {
  return {
    id: res.id,
    chapterName: res.chapterName,
    displayOrder: res.displayOrder != null ? String(res.displayOrder) : "",
    description: res.description ?? "",
    contents: res.contents ?? "",
  };
};
