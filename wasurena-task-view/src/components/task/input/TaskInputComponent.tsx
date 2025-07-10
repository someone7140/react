"use client";

import React, { FC, useState } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
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
import {
  DeadLineCheck,
  TaskCategoryResponse,
  TaskDefinitionResponse,
} from "@/graphql/gen/graphql";
import { TaskInputFormValues, useTaskUtil } from "@/hooks/useTaskUtil";
import {
  formAreaStyle,
  subSettingTextInputStyle,
  textInputStyle,
} from "@/style/formStyle";
import { TASK_DEFINITION_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";

type Props = {
  submitTask: (task: TaskInputFormValues) => void;
  submitDisabled?: boolean;
  categoriesData?: TaskCategoryResponse[];
  registeredTask?: TaskDefinitionResponse;
};

export const TaskInputComponent: FC<Props> = ({
  submitTask,
  submitDisabled,
  categoriesData,
  registeredTask,
}) => {
  const userAccountState = useAtomValue(userAccountAtom);
  const { getTaskInputDeadLineCheckSubSetting } = useTaskUtil();
  const router = useRouter();
  // 対象の期限サブ設定を表示させるかの判定に使う設定
  const [selectedDeadLineCheck, setSelectedDeadLineCheck] = useState<
    DeadLineCheck | undefined
  >(registeredTask?.deadLineCheck ?? undefined);

  const registeredDeadLineCheckSubSetting = registeredTask
    ? getTaskInputDeadLineCheckSubSetting(
        registeredTask?.deadLineCheck ?? undefined,
        registeredTask?.deadLineCheckSubSetting ?? undefined
      )
    : undefined;

  const form = useForm<TaskInputFormValues>({
    mode: "uncontrolled",
    initialValues: registeredTask
      ? {
          title: registeredTask.title,
          displayFlag: registeredTask.displayFlag,
          notificationFlag: registeredTask.notificationFlag,
          deadLineCheck: registeredTask.deadLineCheck ?? "",
          categoryId: registeredTask.categoryId ?? "",
          detail: registeredTask.detail ?? "",
          ...registeredDeadLineCheckSubSetting,
        }
      : {
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

  const categorySelects = categoriesData
    ? [
        { value: "", label: "未指定" },
        ...categoriesData.map((c) => {
          return { value: c.id, label: c.name };
        }),
      ]
    : [];

  form.watch("deadLineCheck", ({ value }) => {
    setSelectedDeadLineCheck(value ? (value as DeadLineCheck) : undefined);
  });

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
      {selectedDeadLineCheck === DeadLineCheck.DailyHour && (
        <NumberInput
          withAsterisk
          hideControls
          label="時間(hour)"
          key={form.key("deadLineCheckSubSettingHour")}
          {...form.getInputProps("deadLineCheckSubSettingHour")}
          className={subSettingTextInputStyle()}
        />
      )}
      {selectedDeadLineCheck === DeadLineCheck.WeeklyDay && (
        <Select
          withAsterisk
          label="週の曜日"
          data={DeadLineWeeklyDayList}
          key={form.key("deadLineCheckSubSettingWeeklyDay")}
          {...form.getInputProps("deadLineCheckSubSettingWeeklyDay")}
          allowDeselect={false}
        />
      )}
      {selectedDeadLineCheck === DeadLineCheck.WeeklyDayInterval && (
        <NumberInput
          withAsterisk
          hideControls
          label="週間隔(数値)"
          key={form.key("deadLineCheckSubSettingWeekInterval")}
          {...form.getInputProps("deadLineCheckSubSettingWeekInterval")}
          className={subSettingTextInputStyle()}
        />
      )}
      {selectedDeadLineCheck === DeadLineCheck.MonthDate && (
        <NumberInput
          withAsterisk
          hideControls
          label="月の指定日(数値)"
          key={form.key("deadLineCheckSubSettingMonthDay")}
          {...form.getInputProps("deadLineCheckSubSettingMonthDay")}
          className={subSettingTextInputStyle()}
        />
      )}
      {selectedDeadLineCheck === DeadLineCheck.YearOnceDate && (
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
      {userAccountState?.isLineBotFollow &&
        form.getValues().displayFlag &&
        !!form.getValues().deadLineCheck && (
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
      <div className="flex justify-center gap-3 mt-2">
        <Button type="submit" color="blue" disabled={submitDisabled}>
          登録
        </Button>
        <Button
          color="gray"
          onClick={() => {
            router.push(`${TASK_DEFINITION_LIST_PAGE_PATH}`);
          }}
        >
          一覧へ
        </Button>
      </div>
    </form>
  );
};
