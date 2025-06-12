"use client";

import React, { FC } from "react";
import { Button, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { TaskCategoryResponse } from "@/graphql/gen/graphql";
import { formAreaStyle, textInputStyle } from "@/style/formStyle";

export type TaskCategoryInputFormValues = {
  name: string;
  displayOrder?: number;
};

type Props = {
  submitTaskCategory: (user: TaskCategoryInputFormValues) => void;
  submitDisabled?: boolean;
  registeredCategory?: TaskCategoryResponse;
};

export const TaskCategoryInputComponent: FC<Props> = ({
  submitTaskCategory,
  submitDisabled,
  registeredCategory,
}) => {
  const form = useForm<TaskCategoryInputFormValues>({
    mode: "uncontrolled",
    initialValues: registeredCategory
      ? {
          name: registeredCategory.name,
          displayOrder: registeredCategory.displayOrder ?? undefined,
        }
      : {
          name: "",
          displayOrder: undefined,
        },

    validate: {
      name: (value) => {
        if (!value) {
          return "カテゴリー名を入力してください";
        }
        return null;
      },
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => submitTaskCategory(values))}
      className={formAreaStyle()}
    >
      <TextInput
        withAsterisk
        label="カテゴリー名"
        key={form.key("name")}
        {...form.getInputProps("name")}
        className={textInputStyle()}
      />
      <NumberInput
        hideControls
        label="表示順"
        key={form.key("displayOrder")}
        {...form.getInputProps("displayOrder")}
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
