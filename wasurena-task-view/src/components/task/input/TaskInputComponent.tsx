"use client";

import React, { FC, useState } from "react";
import {
  Button,
  NumberInput,
  Select,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { DeadLineCheck } from "@/graphql/gen/graphql";
import { formAreaStyle, textInputStyle } from "@/style/formStyle";

export type TaskInputFormValues = {
  title: string;
  displayFlag: boolean;
  deadLineCheck?: string;
  deadLineCheckSubSettingHour?: number;
  detail?: string;
};

const DeadLineCheckList = [
  { value: "", label: "期限なし" },
  { value: DeadLineCheck.DailyOnce, label: "1日に1回実施" },
  { value: DeadLineCheck.DailyHour, label: "時間単位で設定" },
];

type Props = {
  submitTask: (user: TaskInputFormValues) => void;
  submitDisabled?: boolean;
};

export const TaskInputComponent: FC<Props> = ({
  submitTask,
  submitDisabled,
}) => {
  const form = useForm<TaskInputFormValues>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      displayFlag: true,
      deadLineCheck: "",
      deadLineCheckSubSettingHour: undefined,
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
        label="チェック対象一覧表示"
      />
      {form.getValues().displayFlag && (
        <Select
          label="実施期限設定"
          data={DeadLineCheckList}
          key={form.key("deadLineCheck")}
          {...form.getInputProps("deadLineCheck")}
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
