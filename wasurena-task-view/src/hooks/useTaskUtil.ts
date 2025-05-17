"use client";

import { DeadLineCheckList } from "@/constants/TaskConstants";
import { DeadLineCheck, TaskCheckDisplayResponse } from "@/graphql/gen/graphql";

export type DeadLineSubCheckDailyHour = {
  hourInterval: number;
};

export type CategorizeCheckList = {
  checkTask: TaskCheckDisplayResponse[];
  notCheckTask: TaskCheckDisplayResponse[];
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

  // 期限チェックのリストをカテゴライズする
  const getCategorizeCheckList = (checkList: TaskCheckDisplayResponse[]) => {
    let checkTask: TaskCheckDisplayResponse[] = [];
    let notCheckTask: TaskCheckDisplayResponse[] = [];

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

  return { getDeadLineCheckDisplay, getCategorizeCheckList };
};
