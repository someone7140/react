"use client";

import React, { FC, useState } from "react";
import { z } from "zod";
import { useForm, Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

import { FormErrorMessageComponent } from "@/components/common/FormErrorMessageComponent";
import { PostCategorySelectDialogComponent } from "@/components/postCategory/dialog/PostCategorySelectDialogComponent";
import { useGetMyPostCategoriesQuery } from "@/graphql/gen/graphql";
import {
  formItemAreaStyle,
  formLabelStyle,
  formSubmitAreaStyle,
  inputTextLabelStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import { numberInputConvert } from "@/utils/formUtil";
import { getRootCategoryList } from "@/utils/postUtil";

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
  const { data } = useGetMyPostCategoriesQuery({
    variables: { nameFilter: null },
    fetchPolicy: "network-only",
  });
  const categories = data?.getMyPostCategories;
  const [parentCategorySelectDialogOpen, setParentCategorySelectDialogOpen] =
    useState(false);

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

  const getUpdatedParentId = (
    selectParentIdParentId: string,
    nowParentId?: string
  ) => {
    if (nowParentId === selectParentIdParentId) {
      return undefined;
    }
    return selectParentIdParentId;
  };

  return (
    <form className=" max-w-[95%]">
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
      <Field name="parentCategoryId">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <div className="flex gap-4 items-center">
              <Typography color="blue-gray">親カテゴリー</Typography>
              <Button
                color="orange"
                disabled={!categories || categories.length === 0}
                onClick={() => {
                  setParentCategorySelectDialogOpen(true);
                }}
              >
                選択
              </Button>
            </div>
            {categories && (
              <>
                {categories.length === 0 && <>カテゴリーが未登録です</>}
                {field.state.value && (
                  <div className="ml-2 mt-2 text-wrap break-all">
                    {
                      categories.find(
                        (category) => category.id === field.state.value
                      )?.name
                    }
                  </div>
                )}
                <PostCategorySelectDialogComponent
                  isOpen={parentCategorySelectDialogOpen}
                  closeDialog={() => {
                    setParentCategorySelectDialogOpen(false);
                  }}
                  categories={getRootCategoryList(categories)}
                  updateCategoryIdsFunc={(selectParentId: string) => {
                    field.handleChange(
                      getUpdatedParentId(selectParentId, field.state.value)
                    );
                    setParentCategorySelectDialogOpen(false);
                  }}
                  selectedIds={field.state.value ? [field.state.value] : []}
                />
              </>
            )}
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
