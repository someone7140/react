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
import { DeadLineCheckList } from "@/constants/TaskConstants";
import { DeadLineCheck, TaskCategoryResponse } from "@/graphql/gen/graphql";
import { formAreaStyle, textInputStyle } from "@/style/formStyle";

export type TaskInputFormValues = {
  title: string;
  displayFlag: boolean;
  deadLineCheck?: string;
  deadLineCheckSubSettingHour?: number;
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
          if (value == null || !(value > 0)) {
            return "時間を入力してください";
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
          className={textInputStyle()}
        />
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
