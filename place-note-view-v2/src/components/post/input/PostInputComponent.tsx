"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import {
  Button,
  Input,
  Switch,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useForm, Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

import { FormErrorMessageComponent } from "@/components/common/FormErrorMessageComponent";
import { POST_PLACE_LIST_PAGE_PATH } from "@/components/menu/constants/MenuPathConstants";
import { PostCategorySelectDialogComponent } from "@/components/postCategory/dialog/PostCategorySelectDialogComponent";
import { PostCategoryResponse, PostResponse } from "@/graphql/gen/graphql";
import {
  formItemAreaStyle,
  formLabelStyle,
  formSubmitAreaStyle,
  inputTextLabelStyle,
  inputTextStyle,
} from "@/style/FormStyle";

export type SelectPostCategories = {
  selectCategoriesDefault: string[];
  categories: PostCategoryResponse[];
};

export const postInputFormSchema = z.object({
  title: z
    .string({
      required_error: "タイトルは必須です",
    })
    .min(1, {
      message: "タイトルは必須です",
    }),
  visitedDate: z.date({
    required_error: "訪問日は必須です",
  }),
  isOpen: z.boolean(),
  categoryIdList: z.array(z.string()),
  detail: z.string().optional(),
  urlList: z.array(z.string()),
});

export type PostInputFormType = z.infer<typeof postInputFormSchema>;

type Props = {
  execSubmit: (form: PostInputFormType) => void;
  postCategories: SelectPostCategories;
  disabledFlag?: boolean;
  editPostData?: PostResponse;
};

export const PostInputComponent: FC<Props> = ({
  execSubmit,
  postCategories,
  disabledFlag,
  editPostData,
}) => {
  const router = useRouter();
  const [categorySelectDialogOpen, setCategorySelectDialogOpen] =
    useState(false);

  const { Field, handleSubmit } = useForm<
    PostInputFormType,
    Validator<PostInputFormType>
  >({
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: postInputFormSchema,
    },
    defaultValues: {
      title: editPostData?.title ?? "",
      detail: editPostData?.detail ?? "",
      isOpen: editPostData?.isOpen ?? false,
      visitedDate: editPostData?.visitedDateStr
        ? new Date(editPostData.visitedDateStr)
        : new Date(),
      categoryIdList: postCategories.selectCategoriesDefault,
      urlList: editPostData?.urlList.map((url) => url.url) ?? [""],
    } as PostInputFormType,
    onSubmit: async ({ value }) => {
      execSubmit(value);
    },
  });

  const categoryList = postCategories.categories;

  return (
    <form className="max-w-[95%]">
      <Field name="title">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle({ type: "required" })}>
              タイトル
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
      <Field name="visitedDate">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle({ type: "required" })}>
              訪問日
            </Typography>
            <DatePicker
              selected={field.state.value}
              onChange={(date) => field.setValue(date ?? field.state.value)}
              dateFormat="yyyy/MM/dd"
              popperPlacement="bottom-start"
              customInput={
                <Input
                  className={inputTextStyle()}
                  labelProps={{
                    className: inputTextLabelStyle(),
                  }}
                  crossOrigin={undefined}
                />
              }
            />
            <FormErrorMessageComponent errors={field.state.meta.errors} />
          </div>
        )}
      </Field>
      <Field name="isOpen">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle()}>公開設定</Typography>
            <div className="flex gap-5 items-center">
              <Switch
                color="blue"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                crossOrigin={undefined}
              />
              <div>{field.state.value ? "公開" : "非公開"}</div>
            </div>
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
            {categoryList && (
              <>
                {categoryList.length === 0 && (
                  <div className="mt-2 ml-2">
                    設定できるカテゴリーがありません
                  </div>
                )}
                {field.state.value.map((categoryId) => (
                  <div
                    className="ml-2 mt-2 text-wrap break-all"
                    key={categoryId}
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
      <Field name="urlList">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <div className="flex gap-4 items-center">
              <Typography className={formLabelStyle()}>URL</Typography>
              <Button
                color="light-green"
                disabled={!categoryList || categoryList.length === 0}
                onClick={() => {
                  field.pushValue("");
                }}
              >
                追加
              </Button>
            </div>
            {field.state.value.map((_, i) => {
              return (
                <Field key={i} name={`urlList[${i}]`}>
                  {(subField) => {
                    return (
                      <div className="flex gap-2 items-center mt-2">
                        <Input
                          name={subField.name}
                          value={subField.state.value}
                          onBlur={subField.handleBlur}
                          className={`${inputTextStyle()} min-w-[220px]`}
                          labelProps={{
                            className: inputTextLabelStyle(),
                          }}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                          crossOrigin={undefined}
                        />
                        <Button
                          color="blue-gray"
                          className={`min-w-[80px]`}
                          onClick={() => {
                            field.removeValue(i);
                          }}
                        >
                          削除
                        </Button>
                      </div>
                    );
                  }}
                </Field>
              );
            })}
          </div>
        )}
      </Field>
      <Field name="detail">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle()}>詳細など</Typography>
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
          {editPostData ? "編集" : "登録"}
        </Button>
        <Button
          color="blue-gray"
          onClick={() => {
            const listPath = editPostData
              ? `${POST_PLACE_LIST_PAGE_PATH}?editPostId=${editPostData.id}`
              : POST_PLACE_LIST_PAGE_PATH;
            router.push(listPath);
          }}
        >
          場所を再選択
        </Button>
      </div>
    </form>
  );
};
