"use client";

import { DeadLineCheckList } from "@/constants/TaskConstants";
import { DeadLineCheck } from "@/graphql/gen/graphql";

export type DeadLineSubCheckDailyHour = {
  hourInterval: number;
};

export const useTaskUtil = () => {
  // 期限チェックの設定内容の表示用文言
  const getDeadLineCheckDisplay = (
    deadLineCheck?: DeadLineCheck,
    subSetting?: object
  ) => {
    if (deadLineCheck === DeadLineCheck.DailyHour && subSetting) {
      const deadLineSubCheckDailyHour = subSetting as DeadLineSubCheckDailyHour;
      return `${deadLineSubCheckDailyHour.hourInterval}時間ごとに実施`;
    }

    if (deadLineCheck === DeadLineCheck.DailyOnce) {
      return DeadLineCheckList.find((c) => c.value === DeadLineCheck.DailyOnce)
        ?.label;
    }

    return "期限なし";
  };

  return { getDeadLineCheckDisplay };
};
