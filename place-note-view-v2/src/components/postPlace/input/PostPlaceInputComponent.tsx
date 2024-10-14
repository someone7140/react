"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

import { FormErrorMessageComponent } from "@/components/common/FormErrorMessageComponent";
import { POST_CATEGORY_LIST_PAGE_PATH } from "@/components/menu/constants/MenuPathConstants";
import { PostCategorySelectDialogComponent } from "@/components/postCategory/dialog/PostCategorySelectDialogComponent";
import {
  PostCategoryResponse,
  useGetMyPostCategoriesQuery,
} from "@/graphql/gen/graphql";
import {
  formItemAreaStyle,
  formLabelStyle,
  formSubmitAreaStyle,
  inputTextLabelStyle,
  inputTextStyle,
} from "@/style/FormStyle";

type Props = {
  execSubmit: (form: PostPlaceInputFormType) => void;
  disabledFlag?: boolean;
  registeredCategory?: PostCategoryResponse;
};

export const postPlaceInputFormSchema = z.object({
  name: z
    .string({
      required_error: "名前は必須です",
    })
    .min(1, {
      message: "名前は必須です",
    }),
  address: z.string().optional(),
  categoryIdList: z.array(z.string()),
  detail: z.string().optional(),
  url: z.string().optional(),
});

export type PostPlaceInputFormType = z.infer<typeof postPlaceInputFormSchema>;

export const PostPlaceInputComponent: FC<Props> = ({
  execSubmit,
  disabledFlag,
  registeredCategory,
}) => {
  const { data: selectCategoryData, loading: selectCategoryLoading } =
    useGetMyPostCategoriesQuery({
      variables: { nameFilter: null },
      fetchPolicy: "network-only",
    });
  const categoryList = selectCategoryData?.getMyPostCategories;
  const router = useRouter();
  const [categorySelectDialogOpen, setCategorySelectDialogOpen] =
    useState(false);

  const { Field, handleSubmit } = useForm<
    PostPlaceInputFormType,
    Validator<PostPlaceInputFormType>
  >({
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: postPlaceInputFormSchema,
    },
    defaultValues: {
      categoryIdList: [] as string[],
    } as PostPlaceInputFormType,
    onSubmit: async ({ value }) => {
      execSubmit(value);
    },
  });

  return (
    <form className="max-w-[95%]">
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
      <Field name="address">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle()}>住所</Typography>
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
          </div>
        )}
      </Field>
      <Field name="categoryIdList">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <div className="flex gap-4 items-center">
              <Typography className={formLabelStyle()}>カテゴリー</Typography>
              <Button
                color="light-green"
                disabled={!categoryList || categoryList.length === 0}
                onClick={() => {
                  setCategorySelectDialogOpen(true);
                }}
              >
                選択
              </Button>
            </div>
            {!selectCategoryLoading && categoryList && (
              <>
                {selectCategoryData.getMyPostCategories.length === 0 && (
                  <div className="mt-2 ml-2">
                    設定できるカテゴリーがありません
                  </div>
                )}
                {field.state.value.map((categoryId) => (
                  <div
                    className="ml-2 mt-2 text-wrap break-all"
                    key="categoryId"
                  >
                    {categoryList.find((c) => c.id === categoryId)?.name}
                  </div>
                ))}
                <PostCategorySelectDialogComponent
                  isOpen={categorySelectDialogOpen}
                  closeDialog={() => {
                    setCategorySelectDialogOpen(false);
                  }}
                  categories={categoryList}
                  updateCategoryIdsFunc={(selectId: string) => {
                    if (field.state.value.some((id) => id === selectId)) {
                      field.setValue(
                        field.state.value.filter((id) => id !== selectId)
                      );
                    } else {
                      field.setValue([...field.state.value, selectId]);
                    }
                  }}
                  selectedIds={field.state.value}
                />
              </>
            )}
          </div>
        )}
      </Field>
      <Field name="url">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle()}>参考URL</Typography>
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
          </div>
        )}
      </Field>
      <Field name="detail">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle()}>詳細</Typography>
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
          {registeredCategory ? "編集" : "登録"}
        </Button>
        <Button
          color="blue-gray"
          onClick={() => {
            router.push(POST_CATEGORY_LIST_PAGE_PATH);
          }}
        >
          一覧へ
        </Button>
      </div>
    </form>
  );
};
