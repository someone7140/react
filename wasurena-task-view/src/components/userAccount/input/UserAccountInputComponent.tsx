"use client";

import React, { FC } from "react";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { halfSizeRegex } from "@/constants/ValidationConstants";
import { formAreaStyle, textInputStyle } from "@/style/formStyle";

export type UserAccountInputFormValues = {
  userSettingId: string;
  userName: string;
};

type Props = {
  submitUser: (user: UserAccountInputFormValues) => void;
  submitDisabled?: boolean;
  defaultUserSettingId?: string;
  defaultUserName?: string;
};

export const UserAccountInputComponent: FC<Props> = ({
  submitUser,
  submitDisabled,
  defaultUserSettingId,
  defaultUserName,
}) => {
  const form = useForm<UserAccountInputFormValues>({
    mode: "uncontrolled",
    initialValues: {
      userSettingId: defaultUserSettingId ?? "",
      userName: defaultUserName ?? "",
    },

    validate: {
      userSettingId: (value) => {
        if (!value) {
          return "ユーザIDを入力してください";
        }
        if (!halfSizeRegex.test(value)) {
          return "半角文字だけで入力してください";
        }
        return null;
      },
      userName: (value) => (!!value ? null : "ユーザ名を入力してください"),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => submitUser(values))}
      className={formAreaStyle()}
    >
      <TextInput
        withAsterisk
        label="ユーザID"
        placeholder="半角文字で入力"
        key={form.key("userSettingId")}
        {...form.getInputProps("userSettingId")}
        className={textInputStyle()}
      />
      <TextInput
        withAsterisk
        label="ユーザ名"
        key={form.key("userName")}
        {...form.getInputProps("userName")}
        className={textInputStyle()}
      />
      <div className="flex justify-center mt-2">
        <Button type="submit" color="blue" disabled={submitDisabled}>
          登録
        </Button>
      </div>
    </form>
  );
};
