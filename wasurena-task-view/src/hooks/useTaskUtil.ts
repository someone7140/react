"use client";

import { DeadLineCheckList } from "@/constants/TaskConstants";
import {
  DeadLineCheck,
  InputMaybe,
  TaskCheckForListResponse,
} from "@/graphql/gen/graphql";

export type DeadLineSubCheckDailyHour = {
  hourInterval: number;
};

export type DeadLineSubCheckWeeklyDay = {
  weeklyDay: number;
};

export type DeadLineSubCheckWeekInterval = {
  weekInterval: number;
};

export type DeadLineSubCheckMonthlyDay = {
  monthlyDay: number;
};

export type DeadLineSubCheckYearDate = {
  yearDate: string; // 月日（MM-dd形式）
};

export type DeadLineSubCheckDailyHourKindType = {
  kind: "DailyHour";
  deadLineSubCheckDailyHour: DeadLineSubCheckDailyHour;
};

export type DeadLineSubCheckWeeklyDayKindType = {
  kind: "WeeklyDay";
  deadLineSubCheckWeeklyDay: DeadLineSubCheckWeeklyDay;
};

export type DeadLineSubCheckWeekIntervalKindType = {
  kind: "WeekInterval";
  deadLineSubCheckWeekInterval: DeadLineSubCheckWeekInterval;
};

export type DeadLineSubCheckMonthlyDayKindType = {
  kind: "MonthlyDay";
  deadLineSubCheckMonthlyDay: DeadLineSubCheckMonthlyDay;
};

export type DeadLineSubCheckYearDateKindType = {
  kind: "YearDate";
  deadLineSubCheckYearDate: DeadLineSubCheckYearDate;
};

export type CategorizeCheckList = {
  checkTask: TaskCheckForListResponse[];
  notCheckTask: TaskCheckForListResponse[];
};

export type TaskInputFormValues = {
  title: string;
  displayFlag: boolean;
  deadLineCheck?: string;
  deadLineCheckSubSettingHour?: number;
  deadLineCheckSubSettingWeeklyDay?: string; // selectで選択する項目のため文字列型としている
  deadLineCheckSubSettingWeekInterval?: number;
  deadLineCheckSubSettingMonthDay?: number;
  deadLineCheckSubSettingYearMonth?: number;
  deadLineCheckSubSettingYearDay?: number;
  notificationFlag: boolean;
  categoryId: string;
  detail?: string;
};

type TaskInputDeadLineCheckSubSetting = Pick<
  TaskInputFormValues,
  | "deadLineCheckSubSettingHour"
  | "deadLineCheckSubSettingWeeklyDay"
  | "deadLineCheckSubSettingWeekInterval"
  | "deadLineCheckSubSettingMonthDay"
  | "deadLineCheckSubSettingYearMonth"
  | "deadLineCheckSubSettingYearDay"
>;

const WEEK_DAY_NAMES = [
  "日曜日",
  "月曜日",
  "火曜日",
  "水曜日",
  "木曜日",
  "金曜日",
  "土曜日",
];

export const useTaskUtil = () => {
  // 期限チェックのサブ設定の型を返す
  const getDeadLineSubCheckKind = (
    deadLineCheck?: DeadLineCheck,
    subSetting?: object
  ):
    | DeadLineSubCheckDailyHourKindType
    | DeadLineSubCheckWeeklyDayKindType
    | DeadLineSubCheckWeekIntervalKindType
    | DeadLineSubCheckMonthlyDayKindType
    | DeadLineSubCheckYearDateKindType
    | undefined => {
    if (!subSetting) {
      return undefined;
    }

    if (deadLineCheck === DeadLineCheck.DailyHour) {
      return {
        kind: "DailyHour",
        deadLineSubCheckDailyHour: subSetting as DeadLineSubCheckDailyHour,
      };
    }
    if (deadLineCheck === DeadLineCheck.WeeklyDay) {
      return {
        kind: "WeeklyDay",
        deadLineSubCheckWeeklyDay: subSetting as DeadLineSubCheckWeeklyDay,
      };
    }
    if (deadLineCheck === DeadLineCheck.WeeklyDayInterval) {
      return {
        kind: "WeekInterval",
        deadLineSubCheckWeekInterval:
          subSetting as DeadLineSubCheckWeekInterval,
      };
    }
    if (deadLineCheck === DeadLineCheck.MonthDate) {
      return {
        kind: "MonthlyDay",
        deadLineSubCheckMonthlyDay: subSetting as DeadLineSubCheckMonthlyDay,
      };
    }
    if (deadLineCheck === DeadLineCheck.YearOnceDate) {
      return {
        kind: "YearDate",
        deadLineSubCheckYearDate: subSetting as DeadLineSubCheckYearDate,
      };
    }

    return undefined;
  };

  // 期限チェックの設定内容の表示用文言
  const getDeadLineCheckDisplay = (
    deadLineCheck?: DeadLineCheck,
    subSettingObj?: object
  ) => {
    const subSetting = getDeadLineSubCheckKind(deadLineCheck, subSettingObj);

    if (subSetting != null) {
      switch (subSetting.kind) {
        case "DailyHour":
          return `${subSetting.deadLineSubCheckDailyHour.hourInterval}時間ごとに実施`;
        case "WeeklyDay":
          return `毎週${
            WEEK_DAY_NAMES[subSetting.deadLineSubCheckWeeklyDay.weeklyDay]
          }ごとに実施`;
        case "WeeklyDay":
          return `${subSetting.deadLineSubCheckWeeklyDay.weeklyDay}週ごとに実施`;
        case "WeekInterval":
          return `${subSetting.deadLineSubCheckWeekInterval.weekInterval}週間ごとに実施`;
        case "MonthlyDay":
          return `毎月${subSetting.deadLineSubCheckMonthlyDay.monthlyDay}日ごとに実施`;
        case "YearDate":
          return `毎年${parseInt(
            subSetting.deadLineSubCheckYearDate.yearDate.split("-")[0]
          )}月${parseInt(
            subSetting.deadLineSubCheckYearDate.yearDate.split("-")[1]
          )}日ごとに実施`;
        default:
          return "期限なし";
      }
    } else {
      switch (deadLineCheck) {
        case DeadLineCheck.DailyOnce:
          return DeadLineCheckList.find(
            (c) => c.value === DeadLineCheck.DailyOnce
          )?.label;
        case DeadLineCheck.MonthOnce:
          return DeadLineCheckList.find(
            (c) => c.value === DeadLineCheck.MonthOnce
          )?.label;
        default:
          return "期限なし";
      }
    }
  };

  // 期限チェックのサブ設定のインプット用型を返す
  const getTaskInputDeadLineCheckSubSetting = (
    deadLineCheck?: DeadLineCheck,
    subSettingObj?: object
  ) => {
    const subSettingInput: TaskInputDeadLineCheckSubSetting = {};
    const subSetting = getDeadLineSubCheckKind(deadLineCheck, subSettingObj);

    if (subSetting != null) {
      switch (subSetting.kind) {
        case "DailyHour":
          subSettingInput.deadLineCheckSubSettingHour =
            subSetting.deadLineSubCheckDailyHour.hourInterval;
          break;
        case "WeeklyDay":
          subSettingInput.deadLineCheckSubSettingWeeklyDay =
            subSetting.deadLineSubCheckWeeklyDay.weeklyDay.toString();
          break;
        case "WeekInterval":
          subSettingInput.deadLineCheckSubSettingWeekInterval =
            subSetting.deadLineSubCheckWeekInterval.weekInterval;
          break;
        case "MonthlyDay":
          subSettingInput.deadLineCheckSubSettingMonthDay =
            subSetting.deadLineSubCheckMonthlyDay.monthlyDay;
          break;
        case "YearDate":
          subSettingInput.deadLineCheckSubSettingYearMonth = parseInt(
            subSetting.deadLineSubCheckYearDate.yearDate.split("-")[0]
          );
          subSettingInput.deadLineCheckSubSettingYearDay = parseInt(
            subSetting.deadLineSubCheckYearDate.yearDate.split("-")[1]
          );
          break;
      }
    }

    // 曜日の初期値の設定
    if (!subSettingInput.deadLineCheckSubSettingWeeklyDay) {
      subSettingInput.deadLineCheckSubSettingWeeklyDay = "1";
    }
    return subSettingInput;
  };

  // 期限チェックのリストをカテゴライズする
  const getCategorizeCheckList = (checkList: TaskCheckForListResponse[]) => {
    let checkTask: TaskCheckForListResponse[] = [];
    let notCheckTask: TaskCheckForListResponse[] = [];

    for (const check of checkList) {
      if (check.deadLineCheck) {
        checkTask = [...checkTask, check];
      } else {
        notCheckTask = [...notCheckTask, check];
      }
    }

    return {
      checkTask,
      notCheckTask,
    } as CategorizeCheckList;
  };

  // 期限のサブ設定をフォーム情報から取得する
  const getDeadLineCheckSubSettingFromForm = (
    deadLineCheck: DeadLineCheck | null,
    formValues: TaskInputFormValues
  ) => {
    let deadLineCheckSubSetting: InputMaybe<object> | null = null;
    // 時間単位の設定がされていた場合
    if (
      deadLineCheck === DeadLineCheck.DailyHour &&
      formValues.deadLineCheckSubSettingHour != null
    ) {
      deadLineCheckSubSetting = {
        hourInterval: formValues.deadLineCheckSubSettingHour,
      } as DeadLineSubCheckDailyHour;
    }
    // 週の曜日設定がされていた場合
    if (
      deadLineCheck === DeadLineCheck.WeeklyDay &&
      formValues.deadLineCheckSubSettingWeeklyDay != null
    ) {
      deadLineCheckSubSetting = {
        weeklyDay: parseInt(formValues.deadLineCheckSubSettingWeeklyDay), // 文字列で選択してるので数値にparse
      } as DeadLineSubCheckWeeklyDay;
    }
    // 週の間隔設定がされていた場合
    if (
      deadLineCheck === DeadLineCheck.WeeklyDayInterval &&
      formValues.deadLineCheckSubSettingWeekInterval != null
    ) {
      deadLineCheckSubSetting = {
        weekInterval: formValues.deadLineCheckSubSettingWeekInterval,
      } as DeadLineSubCheckWeekInterval;
    }
    // 月の指定日設定がされていた場合
    if (
      deadLineCheck === DeadLineCheck.MonthDate &&
      formValues.deadLineCheckSubSettingMonthDay != null
    ) {
      deadLineCheckSubSetting = {
        monthlyDay: formValues.deadLineCheckSubSettingMonthDay,
      } as DeadLineSubCheckMonthlyDay;
    }
    // 年の日付設定がされていた場合
    if (
      deadLineCheck === DeadLineCheck.YearOnceDate &&
      formValues.deadLineCheckSubSettingYearMonth != null &&
      formValues.deadLineCheckSubSettingYearDay != null
    ) {
      deadLineCheckSubSetting = {
        yearDate: `${formValues.deadLineCheckSubSettingYearMonth
          .toString()
          .padStart(2, "0")}-${formValues.deadLineCheckSubSettingYearDay
          .toString()
          .padStart(2, "0")}`,
      } as DeadLineSubCheckYearDate;
    }

    return deadLineCheckSubSetting;
  };

  return {
    getDeadLineCheckDisplay,
    getCategorizeCheckList,
    getDeadLineCheckSubSettingFromForm,
    getTaskInputDeadLineCheckSubSetting,
  };
};
