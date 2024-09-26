"use client";

import React, { FC } from "react";
import { z } from "zod";
import { useForm, Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

import {
  formItemAreaStyle,
  formLabelStyle,
  formSubmitAreaStyle,
  inputTextLabelStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import { FormErrorMessageComponent } from "@/components/common/FormErrorMessageComponent";
import { numberInputConvert } from "@/utils/formUtil";

type Props = {
  execSubmit: (form: PostCategoryInputFormType) => void;
  disabledFlag?: boolean;
};

export const postCategoryInputFormSchema = z.object({
  name: z
    .string({
      required_error: "名前は必須です",
    })
    .min(1, {
      message: "名前は必須です",
    }),
  parentCategoryId: z.string().optional(),
  displayOrder: z.preprocess(
    numberInputConvert,
    z
      .number({
        invalid_type_error: "表示順は数値を入力してください",
      })
      .optional()
  ),
  detail: z.string().optional(),
});

export type PostCategoryInputFormType = z.infer<
  typeof postCategoryInputFormSchema
>;

export const PostCategoryInputComponent: FC<Props> = ({
  execSubmit,
  disabledFlag,
}) => {
  const { Field, handleSubmit } = useForm<
    PostCategoryInputFormType,
    Validator<PostCategoryInputFormType>
  >({
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: postCategoryInputFormSchema,
    },
    defaultValues: {} as PostCategoryInputFormType,
    onSubmit: async ({ value }) => {
      execSubmit(value);
    },
  });

  return (
    <form>
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
      <Field name="displayOrder">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography color="blue-gray">表示順</Typography>
            <Input
              name={field.name}
              value={Number.isNaN(field.state.value) ? "" : field.state.value}
              onBlur={field.handleBlur}
              className={inputTextStyle()}
              labelProps={{
                className: inputTextLabelStyle(),
              }}
              onChange={(e) => field.handleChange(parseInt(e.target.value))}
              crossOrigin={undefined}
            />
            <FormErrorMessageComponent errors={field.state.meta.errors} />
          </div>
        )}
      </Field>
      <Field name="detail">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography color="blue-gray">詳細</Typography>
            <Textarea
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              className={inputTextStyle()}
              onChange={(e) => field.handleChange(e.target.value)}
              labelProps={{
                className: inputTextLabelStyle(),
              }}
            />
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
