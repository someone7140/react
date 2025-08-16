"use client";

import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { halfSizeRegex } from "@/constants/ValidationConstants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  formInputStyle,
  formLabelStyle,
  submitButtonStyle,
} from "@/style/FormStyle";

export const userAccountInputFormSchema = z.object({
  userSettingId: z
    .string()
    .min(1, {
      message: "ユーザIDは必須です",
    })
    .regex(halfSizeRegex, "半角文字で入力してください"),
  name: z.string().min(1, {
    message: "名前は必須です",
  }),
});

export type UserAccountInputFormType = z.infer<
  typeof userAccountInputFormSchema
>;

type Props = {
  onSubmit: (formData: UserAccountInputFormType) => void;
  disabled?: boolean;
};

export const UserAccountInputComponent: FC<Props> = ({
  onSubmit,
  disabled,
}) => {
  const form = useForm<z.infer<typeof userAccountInputFormSchema>>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(userAccountInputFormSchema),
    defaultValues: {
      userSettingId: "",
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userSettingId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={formLabelStyle({ type: "required" })}>
                ユーザーID
              </FormLabel>
              <FormControl>
                <Input {...field} className={formInputStyle()} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={formLabelStyle({ type: "required" })}>
                名前
              </FormLabel>
              <FormControl>
                <Input {...field} className={formInputStyle()} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={submitButtonStyle()}
          disabled={disabled}
        >
          登録
        </Button>
      </form>
    </Form>
  );
};
