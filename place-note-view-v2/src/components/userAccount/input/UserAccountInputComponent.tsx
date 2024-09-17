"use client";

import React, { FC } from "react";
import { z } from "zod";

import { halfSizeRegex } from "@/constants/ValidationConsntants";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Button, Input, Typography } from "@material-tailwind/react";
import {
  formItemAreaStyle,
  formLabelStyle,
  formSubmitAreaStyle,
  inputTextLabelStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import { FormErrorMessageComponent } from "@/components/common/FormErrorMessageComponent";

type Props = {
  execSubmit: (form: UserAccountInputFormType) => void;
  disabledFlag?: boolean;
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
  name: z
    .string({
      required_error: "名前は必須です",
    })
    .min(1, {
      message: "名前は必須です",
    }),
  imageFile: z.custom<File>(),
});

export type UserAccountInputFormType = z.infer<
  typeof userAccountInputFormSchema
>;

export const UserAccountInputComponent: FC<Props> = ({
  execSubmit,
  disabledFlag,
}) => {
  const { Field, handleSubmit } = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {} as UserAccountInputFormType,
    onSubmit: async ({ value }) => {
      execSubmit(value);
    },
  });

  return (
    <form>
      <Field
        name="userSettingId"
        validators={{
          onSubmit: userAccountInputFormSchema.shape.userSettingId,
        }}
      >
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle({ type: "required" })}>
              ユーザID
            </Typography>
            <Input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              placeholder="半角英数字で入力"
              className={inputTextStyle()}
              labelProps={{
                className: inputTextLabelStyle(),
              }}
              onChange={(e) => field.handleChange(e.target.value)}
              crossOrigin={undefined}
            />
            <FormErrorMessageComponent errors={field.state.meta.errors} />
          </div>
        )}
      </Field>
      <Field
        name="name"
        validators={{
          onSubmit: userAccountInputFormSchema.shape.name,
        }}
      >
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography
              color="blue-gray"
              className={formLabelStyle({ type: "required" })}
            >
              名前
            </Typography>
            <Input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              className={inputTextStyle()}
              labelProps={{
                className: inputTextLabelStyle(),
              }}
              onChange={(e) => field.handleChange(e.target.value)}
              crossOrigin={undefined}
            />
            <FormErrorMessageComponent errors={field.state.meta.errors} />
          </div>
        )}
      </Field>
      <div className={formSubmitAreaStyle()}>
        <Button color="indigo" loading={disabledFlag} onClick={handleSubmit}>
          登録
        </Button>
      </div>
    </form>
  );
};
