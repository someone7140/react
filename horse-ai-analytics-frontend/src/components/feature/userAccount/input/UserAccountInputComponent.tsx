"use client";

import React, { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { halfSizeRegex } from "@/constants/ValidationConsntants";
import { buttonStyle } from "@/styles/CommonStyle";
import { inputTextStyle, requiredMark } from "@/styles/FormStyle";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccountUserResponse } from "@/query/graphqlGen/graphql";

type Props = {
  submitFunc: (form: z.infer<typeof userAccountInputFormSchema>) => void;
  disabledFlag?: boolean;
  userAccount?: AccountUserResponse;
};

export const userAccountInputFormSchema = z.object({
  userSettingId: z
    .string({
      required_error: "ユーザIDは必須です",
    })
    .min(1, {
      message: "ユーザIDは必須です",
    })
    .regex(halfSizeRegex, "半角文字で入力してください"),
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
  disabledFlag,
  userAccount,
}) => {
  const form = useForm<z.infer<typeof userAccountInputFormSchema>>({
    resolver: zodResolver(userAccountInputFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: userAccount
      ? {
          userName: userAccount.name,
          userSettingId: userAccount.userSettingId,
        }
      : undefined,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitFunc)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="userSettingId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={requiredMark()}>ユーザID</FormLabel>
                <FormControl>
                  <Input {...field} className={inputTextStyle()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={requiredMark()}>ユーザ表示名</FormLabel>
                <FormControl>
                  <Input {...field} className={inputTextStyle()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className={`${buttonStyle({ color: "indigo" })} mt-5`}
          type="submit"
          disabled={disabledFlag}
        >
          <p>ユーザ{userAccount ? "編集" : "登録"}</p>
        </Button>
      </form>
    </Form>
  );
};
