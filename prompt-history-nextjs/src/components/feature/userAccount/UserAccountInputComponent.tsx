"use client";

import React, { FC } from "react";
import { z } from "zod";

import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { halfSizeRegex } from "@/constants/ValidationConsntants";
import { inputTextStyle } from "@/styles/FormStyle";
import { buttonStyle } from "@/styles/CommonStyle";

type Props = {
  submitFunc: (form: z.infer<typeof userAccountInputFormSchema>) => void;
  disabled?: boolean;
};

export const userAccountInputFormSchema = z.object({
  userSettingId: z
    .string({
      required_error: "ユーザIDは必須です",
    })
    .min(1, {
      message: "ユーザIDは必須です",
    })
    .regex(halfSizeRegex, "半角文字で入力してください")
    .describe("ユーザID"),
  userName: z
    .string({
      required_error: "ユーザ表示名は必須です",
    })
    .min(1, {
      message: "ユーザ表示名は必須です",
    })
    .describe("ユーザ表示名"),
});

export const UserAccountInputComponent: FC<Props> = ({
  submitFunc,
  disabled,
}) => {
  return (
    <AutoForm
      onSubmit={submitFunc}
      formSchema={userAccountInputFormSchema}
      fieldConfig={{
        userSettingId: {
          inputProps: {
            className: inputTextStyle(),
          },
        },
        userName: {
          inputProps: {
            className: inputTextStyle(),
          },
        },
      }}
    >
      <Button
        className={buttonStyle({ color: "indigo" })}
        type="submit"
        disabled={disabled}
      >
        <p>ユーザ登録</p>
      </Button>
    </AutoForm>
  );
};
