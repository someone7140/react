import { DeadLineCheck } from "@/graphql/gen/graphql";

export const DeadLineCheckList = [
  { value: "", label: "期限なし" },
  { value: DeadLineCheck.DailyOnce, label: "1日に1回実施" },
  { value: DeadLineCheck.DailyHour, label: "時間単位で設定" },
  { value: DeadLineCheck.WeeklyDay, label: "週の曜日で設定" },
  { value: DeadLineCheck.WeeklyDayInterval, label: "週の間隔で設定" },
  { value: DeadLineCheck.MonthOnce, label: "月に1回実施" },
  { value: DeadLineCheck.MonthDate, label: "月の指定日で設定" },
  { value: DeadLineCheck.YearOnceDate, label: "年の日付で設定" },
];

export const DeadLineWeeklyDayList = [
  { value: "1", label: "月曜日" },
  { value: "2", label: "火曜日" },
  { value: "3", label: "水曜日" },
  { value: "4", label: "木曜日" },
  { value: "5", label: "金曜日" },
  { value: "6", label: "土曜日" },
  { value: "0", label: "日曜日" },
];
