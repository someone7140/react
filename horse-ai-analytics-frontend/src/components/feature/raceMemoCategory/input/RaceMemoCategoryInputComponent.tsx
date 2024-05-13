"use client";

import React, { FC } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GetRaceMemoCategoryListQuery } from "@/query/graphqlGen/graphql";
import { buttonStyle } from "@/styles/CommonStyle";
import { inputTextStyle, requiredMark } from "@/styles/FormStyle";

export const raceMemoCategoryFormSchema = z.object({
  name: z
    .string({
      required_error: "名前は必須です",
    })
    .min(1, {
      message: "名前は必須です",
    }),
  displayOrder: z.preprocess(
    (v) => {
      const valueStr = String(v);
      if (v != null && valueStr) {
        return parseInt(valueStr);
      }
      return undefined;
    },
    z
      .number({
        invalid_type_error: "表示順は数値を入力してください",
      })
      .optional()
  ),
});

type Props = {
  submitFunc: (data: z.infer<typeof raceMemoCategoryFormSchema>) => void;
  registerDisabled?: boolean;
  category?: GetRaceMemoCategoryListQuery["getRaceMemoCategoryList"][0];
};

export const RaceMemoCategoryInputComponent: FC<Props> = ({
  submitFunc,
  registerDisabled,
  category,
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof raceMemoCategoryFormSchema>>({
    resolver: zodResolver(raceMemoCategoryFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: category
      ? {
          name: category.name ?? undefined,
          displayOrder:
            category.displayOrder != null ? category.displayOrder : undefined,
        }
      : undefined,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitFunc)}>
        <div className="flex flex-col gap-4 ml-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={requiredMark()}>カテゴリー名</FormLabel>
                <FormControl>
                  <Input {...field} className={inputTextStyle()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`displayOrder`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>表示順</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={inputTextStyle()}
                    placeholder="表示順を数値で入力"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {category ? (
          <div className="flex flex-row justify-center items-center gap-8 mt-5">
            <Button
              className={`${buttonStyle({ color: "indigo" })} mt-5`}
              type="submit"
              disabled={registerDisabled}
            >
              <p>編集する</p>
            </Button>
            <Button
              className={`${buttonStyle({ color: "cyan" })} mt-5`}
              type="button"
              onClick={() => {
                router.push("/race/memoCategory/categoryList");
              }}
            >
              <p>一覧へ</p>
            </Button>
          </div>
        ) : (
          <div className="flex flex-row justify-center mt-5">
            <Button
              className={`${buttonStyle({ color: "indigo" })}`}
              type="submit"
              disabled={registerDisabled}
            >
              <p>カテゴリーを登録</p>
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
