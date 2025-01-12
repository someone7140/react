"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, Validator } from "@tanstack/react-form";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

import { FormErrorMessageComponent } from "@/components/common/FormErrorMessageComponent";
import { POST_CATEGORY_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
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
import { numberInputConvert } from "@/utils/formUtil";
import { getRootCategoryList } from "@/utils/postUtil";

type Props = {
  execSubmit: (form: PostCategoryInputFormType) => void;
  disabledFlag?: boolean;
  registeredCategory?: PostCategoryResponse;
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
  registeredCategory,
}) => {
  const { data: selectCategoryData, loading: selectCategoryLoading } =
    useGetMyPostCategoriesQuery({
      variables: { nameFilter: null },
      fetchPolicy: "network-only",
    });
  const selectCategoryList = getRootCategoryList(
    selectCategoryData?.getMyPostCategories ?? []
  ).filter((category) => {
    return category.id !== registeredCategory?.id;
  });

  const router = useRouter();
  const [parentCategorySelectDialogOpen, setParentCategorySelectDialogOpen] =
    useState(false);

  const { Field, handleSubmit } = useForm<
    PostCategoryInputFormType,
    Validator<PostCategoryInputFormType>
  >({
    validators: {
      onSubmit: postCategoryInputFormSchema,
    },
    defaultValues: (registeredCategory
      ? {
          name: registeredCategory.name,
          parentCategoryId: registeredCategory.parentCategoryId ?? "",
          displayOrder: registeredCategory.displayOrder ?? "",
          detail: registeredCategory.detail ?? "",
        }
      : {
          name: "",
          parentCategoryId: "",
          displayOrder: "",
          detail: "",
        }) as PostCategoryInputFormType,
    onSubmit: async ({ value }) => {
      execSubmit(value);
    },
  });

  const getUpdatedParentId = (
    selectParentIdParentId: string,
    nowParentId?: string
  ) => {
    if (selectParentIdParentId === nowParentId) {
      return "";
    }
    return selectParentIdParentId;
  };

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
      <Field name="displayOrder">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle()}>表示順</Typography>
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
                disabled={selectCategoryList.length === 0}
                onClick={() => {
                  setParentCategorySelectDialogOpen(true);
                }}
              >
                選択
              </Button>
            </div>
            {!selectCategoryLoading && (
              <>
                {selectCategoryList.length === 0 && (
                  <div className="mt-2 ml-2">
                    設定できるカテゴリーがありません
                  </div>
                )}
                {field.state.value && (
                  <div className="ml-2 mt-2 text-wrap break-all">
                    {
                      selectCategoryList.find(
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
                  categories={selectCategoryList}
                  updateCategoryIdsFunc={(selectParentId: string) => {
                    field.setValue(
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
        <Button color="indigo" disabled={disabledFlag} onClick={handleSubmit}>
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
