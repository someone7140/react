import { DeadLineCheck } from "@/graphql/gen/graphql";

export const DeadLineCheckList = [
  { value: "", label: "期限なし" },
  { value: DeadLineCheck.DailyOnce, label: "1日に1回実施" },
  { value: DeadLineCheck.DailyHour, label: "時間単位で設定" },
];
