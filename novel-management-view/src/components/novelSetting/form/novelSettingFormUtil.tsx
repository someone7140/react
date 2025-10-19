"use client";

import { NovelSettingResponse } from "@/graphql/gen/graphql";
import z from "zod";

export const novelSettingInputFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "タイトルは必須です",
  }),
  displayOrder: z.string().refine((val) => {
    if (val === "") return true;
    const num = Number(val);
    return !isNaN(num) && Number.isInteger(num);
  }, "数値を入力してください"),
  description: z.string(),
  attributes: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

export type NovelSettingInputFormType = z.infer<
  typeof novelSettingInputFormSchema
>;

// 設定のレスポンスからインプット用の型に変換する関数
export const convertSettingInputFromResponse = (
  res: NovelSettingResponse
): NovelSettingInputFormType => {
  return {
    id: res.id,
    name: res.name,
    displayOrder: res.displayOrder != null ? String(res.displayOrder) : "",
    description: res.description ?? "",
    attributes: res.attributes.map((a) => {
      return { value: a };
    }),
  };
};
