"use client";

import React, { FC } from "react";
import { Button, Select, Switch, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { DeadLineCheck } from "@/graphql/gen/graphql";
import { formAreaStyle, textInputStyle } from "@/style/formStyle";

export type TaskInputFormValues = {
  title: string;
  displayFlag: boolean;
  deadLineCheck?: string;
  deadLineCheckSubSetting?: Map<string, string>;
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
    },

    validate: {
      title: (value) => {
        if (!value) {
          return "タイトルを入力してください";
        }
        return null;
      },
    },
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
