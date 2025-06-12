"use client";

import React, { FC, useState } from "react";
import { useAtomValue } from "jotai";
import {
  Button,
  NumberInput,
  Select,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import {
  DeadLineCheckList,
  DeadLineWeeklyDayList,
} from "@/constants/TaskConstants";
import { DeadLineCheck, TaskCategoryResponse } from "@/graphql/gen/graphql";
import {
  formAreaStyle,
  subSettingTextInputStyle,
  textInputStyle,
} from "@/style/formStyle";

export type TaskInputFormValues = {
  title: string;
  displayFlag: boolean;
  deadLineCheck?: string;
  deadLineCheckSubSettingHour?: number;
  deadLineCheckSubSettingWeeklyDay?: string;
  deadLineCheckSubSettingWeekInterval?: number;
  deadLineCheckSubSettingMonthDay?: number;
  deadLineCheckSubSettingYearMonth?: number;
  deadLineCheckSubSettingYearDay?: number;
  notificationFlag: boolean;
  categoryId: string;
  detail?: string;
};

type Props = {
  submitTask: (user: TaskInputFormValues) => void;
  submitDisabled?: boolean;
  categoriesData?: TaskCategoryResponse[];
};

export const TaskInputComponent: FC<Props> = ({
  submitTask,
  submitDisabled,
  categoriesData,
}) => {
  const userAccountState = useAtomValue(userAccountAtom);

  const form = useForm<TaskInputFormValues>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      displayFlag: true,
      notificationFlag: false,
      deadLineCheck: "",
      deadLineCheckSubSettingHour: undefined,
      deadLineCheckSubSettingWeeklyDay: "1", // デフォルトは月曜日とする
      deadLineCheckSubSettingWeekInterval: undefined,
      deadLineCheckSubSettingMonthDay: undefined,
      deadLineCheckSubSettingYearMonth: undefined,
      deadLineCheckSubSettingYearDay: undefined,
      categoryId: "",
    },

    validate: {
      title: (value) => {
        if (!value) {
          return "タイトルを入力してください";
        }
        return null;
      },
      deadLineCheckSubSettingHour: (value, values) => {
        if (values.deadLineCheck == DeadLineCheck.DailyHour) {
          if (value == null || value <= 0) {
            return "時間を入力してください";
          }
        }
        return null;
      },
      deadLineCheckSubSettingWeekInterval: (value, values) => {
        if (values.deadLineCheck == DeadLineCheck.WeeklyDayInterval) {
          if (value == null || value <= 0) {
            return "週間隔を入力してください";
          }
        }
        return null;
      },
      deadLineCheckSubSettingMonthDay: (value, values) => {
        if (values.deadLineCheck == DeadLineCheck.MonthDate) {
          if (value == null || value <= 0 || value > 31) {
            return "日を入力してください";
          }
        }
        return null;
      },
      deadLineCheckSubSettingYearMonth: (value, values) => {
        if (values.deadLineCheck == DeadLineCheck.YearOnceDate) {
          if (value == null || value <= 0 || value > 12) {
            return "月を入力してください";
          }
        }
        return null;
      },
      deadLineCheckSubSettingYearDay: (value, values) => {
        if (values.deadLineCheck == DeadLineCheck.YearOnceDate) {
          if (value == null || value <= 0 || value > 31) {
            return "日を入力してください";
          }
        }
        return null;
      },
    },
  });
  const [deadLineCheckState, setDeadLineCheckState] = useState<
    DeadLineCheck | undefined
  >(undefined);

  form.watch("deadLineCheck", ({ value }) => {
    if (value) {
      setDeadLineCheckState(value as DeadLineCheck);
    } else {
      setDeadLineCheckState(undefined);
    }
  });

  const categorySelects = categoriesData
    ? [
        { value: "", label: "未指定" },
        ...categoriesData.map((c) => {
          return { value: c.id, label: c.name };
        }),
      ]
    : [];

  return (
    <form
      onSubmit={form.onSubmit((values) => submitTask(values))}
      className={formAreaStyle()}
    >
      <TextInput
        withAsterisk
        label="タイトル"
        key={form.key("title")}
        {...form.getInputProps("title")}
        className={textInputStyle()}
      />
      <Switch
        key={form.key("displayFlag")}
        {...form.getInputProps("displayFlag", { type: "checkbox" })}
        label="チェック対象一覧表示の切替"
      />
      {categorySelects?.length > 0 && (
        <Select
          label="カテゴリー"
          data={categorySelects}
          key={form.key("categoryId")}
          {...form.getInputProps("categoryId")}
          allowDeselect={false}
        />
      )}
      {form.getValues().displayFlag && (
        <Select
          label="実施期限設定"
          data={DeadLineCheckList}
          key={form.key("deadLineCheck")}
          {...form.getInputProps("deadLineCheck")}
          allowDeselect={false}
        />
      )}
      {deadLineCheckState == DeadLineCheck.DailyHour && (
        <NumberInput
          withAsterisk
          hideControls
          label="時間(hour)"
          key={form.key("deadLineCheckSubSettingHour")}
          {...form.getInputProps("deadLineCheckSubSettingHour")}
          className={subSettingTextInputStyle()}
        />
      )}
      {deadLineCheckState == DeadLineCheck.WeeklyDay && (
        <Select
          withAsterisk
          label="週の曜日"
          data={DeadLineWeeklyDayList}
          key={form.key("deadLineCheckSubSettingWeeklyDay")}
          {...form.getInputProps("deadLineCheckSubSettingWeeklyDay")}
          allowDeselect={false}
        />
      )}
      {deadLineCheckState == DeadLineCheck.WeeklyDayInterval && (
        <NumberInput
          withAsterisk
          hideControls
          label="週間隔(数値)"
          key={form.key("deadLineCheckSubSettingWeekInterval")}
          {...form.getInputProps("deadLineCheckSubSettingWeekInterval")}
          className={subSettingTextInputStyle()}
        />
      )}
      {deadLineCheckState == DeadLineCheck.MonthDate && (
        <NumberInput
          withAsterisk
          hideControls
          label="月の指定日(数値)"
          key={form.key("deadLineCheckSubSettingMonthDay")}
          {...form.getInputProps("deadLineCheckSubSettingMonthDay")}
          className={subSettingTextInputStyle()}
        />
      )}
      {deadLineCheckState == DeadLineCheck.YearOnceDate && (
        <>
          <NumberInput
            withAsterisk
            hideControls
            label="年の指定月(数値)"
            key={form.key("deadLineCheckSubSettingYearMonth")}
            {...form.getInputProps("deadLineCheckSubSettingYearMonth")}
            className={subSettingTextInputStyle()}
          />
          <NumberInput
            withAsterisk
            hideControls
            label="年の指定日(数値)"
            key={form.key("deadLineCheckSubSettingYearDay")}
            {...form.getInputProps("deadLineCheckSubSettingYearDay")}
            className={subSettingTextInputStyle()}
          />
        </>
      )}
      {userAccountState?.isLineBotFollow && form.getValues().displayFlag && (
        <Switch
          key={form.key("notificationFlag")}
          {...form.getInputProps("notificationFlag", { type: "checkbox" })}
          label="LINE通知"
        />
      )}
      <Textarea
        label="詳細など"
        key={form.key("detail")}
        {...form.getInputProps("detail")}
        className={textInputStyle()}
        autosize
        minRows={3}
        maxRows={7}
      />
      <div className="flex justify-center mt-2">
        <Button type="submit" color="blue" disabled={submitDisabled}>
          登録
        </Button>
      </div>
    </form>
  );
};
