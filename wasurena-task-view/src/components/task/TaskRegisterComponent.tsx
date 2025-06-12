"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { useAtomValue } from "jotai";

import {
  TaskInputComponent,
  TaskInputFormValues,
} from "./input/TaskInputComponent";
import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { TASK_DEFINITION_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  DeadLineCheck,
  InputMaybe,
  useCreateTaskMutation,
  useGetTaskCategoriesForTaskDefinitionQueryQuery,
} from "@/graphql/gen/graphql";
import {
  DeadLineSubCheckDailyHour,
  DeadLineSubCheckMonthlyDay,
  DeadLineSubCheckWeekInterval,
  DeadLineSubCheckWeeklyDay,
  DeadLineSubCheckYearDate,
} from "@/hooks/useTaskUtil";

export const TaskRegisterComponent: FC = ({}) => {
  const [{ data: categoryData }] =
    useGetTaskCategoriesForTaskDefinitionQueryQuery({
      requestPolicy: "network-only",
    });
  const [createTaskMutationResult, createTaskMutation] =
    useCreateTaskMutation();
  const router = useRouter();
  const userAccountState = useAtomValue(userAccountAtom);

  const submitRegisterTask = async (formValues: TaskInputFormValues) => {
    const deadLineCheck =
      formValues.displayFlag && formValues.deadLineCheck
        ? (formValues.deadLineCheck as DeadLineCheck)
        : null;
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

    const notificationFlag =
      formValues.displayFlag && userAccountState?.isLineBotFollow
        ? formValues.notificationFlag
        : false;

    const result = await createTaskMutation({
      title: formValues.title,
      displayFlag: formValues.displayFlag,
      notificationFlag: notificationFlag,
      categoryId: formValues.categoryId ?? null,
      deadLineCheck: deadLineCheck,
      deadLineCheckSubSetting: deadLineCheckSubSetting,
      detail: formValues.detail ?? null,
    });
    if (!result?.data?.createTask || result.error) {
      notifications.show({
        id: "submitRegister-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "登録エラー",
        message: "タスクの登録に失敗しました",
        color: "red",
        loading: false,
      });
    } else {
      notifications.show({
        id: "submitRegister-success",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "タスク登録",
        message: "タスク登録しました。",
        color: "green",
        loading: false,
      });
      router.push(`${TASK_DEFINITION_LIST_PAGE_PATH}`);
    }
  };

  return (
    <>
      <TaskInputComponent
        submitTask={submitRegisterTask}
        submitDisabled={createTaskMutationResult.fetching}
        categoriesData={categoryData?.getTaskCategories ?? undefined}
      />
    </>
  );
};
