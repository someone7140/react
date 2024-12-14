"use client";

import React, { FC } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm, Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Button, Input, Typography } from "@material-tailwind/react";

import { halfSizeRegex } from "@/constants/ValidationConsntants";
import {
  formItemAreaStyle,
  formLabelStyle,
  formSubmitAreaStyle,
  inputTextLabelStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import { FormErrorMessageComponent } from "@/components/common/FormErrorMessageComponent";
import { AccountUserResponse } from "@/graphql/gen/graphql";

type Props = {
  execSubmit: (form: UserAccountInputFormType) => void;
  disabledFlag?: boolean;
  editUser?: AccountUserResponse;
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
  imageFile: z.custom<File>().optional(),
});

export type UserAccountInputFormType = z.infer<
  typeof userAccountInputFormSchema
>;

export const UserAccountInputComponent: FC<Props> = ({
  execSubmit,
  disabledFlag,
  editUser,
}) => {
  const { Field, handleSubmit, setFieldValue } = useForm<
    UserAccountInputFormType,
    Validator<UserAccountInputFormType>
  >({
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: userAccountInputFormSchema,
    },
    defaultValues: (editUser
      ? {
          userSettingId: editUser.userSettingId,
          name: editUser.name,
        }
      : {
          userSettingId: "",
          name: "",
        }) as UserAccountInputFormType,
    onSubmit: async ({ value }) => {
      execSubmit(value);
    },
  });

  return (
    <form>
      <Field name="userSettingId">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle({ type: "required" })}>
              ユーザID
            </Typography>
            <Input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              placeholder="半角文字で入力"
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
      <Field name="name">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle({ type: "required" })}>
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
      <Field name="imageFile">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle()}>アイコン画像</Typography>
            <input
              type="file"
              name={field.name}
              onChange={(e) => {
                setFieldValue("imageFile", e.target.files?.[0]);
              }}
            />
            {editUser?.imageUrl && !field.state.value && (
              <Image
                src={editUser.imageUrl}
                width={150}
                height={150}
                alt={editUser.name}
                className="mt-2"
              />
            )}
          </div>
        )}
      </Field>
      <div className={formSubmitAreaStyle()}>
        <Button color="indigo" disabled={disabledFlag} onClick={handleSubmit}>
          登録
        </Button>
      </div>
    </form>
  );
};
