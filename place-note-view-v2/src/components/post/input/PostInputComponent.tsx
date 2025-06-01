"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "@tanstack/react-form";
import { Button, Input, Switch, Textarea, Tooltip } from "@heroui/react";

import { FormErrorMessageComponent } from "@/components/common/FormErrorMessageComponent";
import { PostCategorySelectDialogComponent } from "@/components/postCategory/dialog/PostCategorySelectDialogComponent";
import { POST_PLACE_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  postInputFormSchema,
  PostInputFormType,
  usePostInputSessionStore,
} from "@/hooks/inputSessionStore/usePostSessionStore";
import { PostCategoryResponse, PostResponse } from "@/graphql/gen/graphql";
import {
  formItemAreaStyle,
  formLabelStyle,
  formSubmitAreaStyle,
  inputTextStyle,
} from "@/style/FormStyle";

export type SelectPostCategories = {
  selectCategoriesDefault: string[];
  categories: PostCategoryResponse[];
};

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
  const [openPopover, setOpenPopover] = useState(false);
  const { postInputSession, updatePostInputSession } =
    usePostInputSessionStore();

  const form = useForm({
    validators: {
      onSubmit: postInputFormSchema,
    },
    defaultValues: postInputSession
      ? {
          ...postInputSession,
          visitedDate: postInputSession.visitedDateStr
            ? new Date(postInputSession.visitedDateStr)
            : new Date(),
        }
      : ({
          title: editPostData?.title ?? "",
          detail: editPostData?.detail ?? "",
          isOpen: editPostData?.isOpen ?? false,
          visitedDate: editPostData?.visitedDateStr
            ? new Date(editPostData.visitedDateStr)
            : new Date(),
          categoryIdList: postCategories.selectCategoriesDefault,
          urlList: editPostData?.urlList.map((url) => url.url) ?? [""],
        } as PostInputFormType),
    onSubmit: async ({ value }) => {
      execSubmit(value);
    },
  });

  const categoryList = postCategories.categories;

  return (
    <form className="max-w-[95%]">
      <form.Field name="title">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Input
              label="場所名"
              isRequired
              name={field.name}
              value={field.state.value}
              className={inputTextStyle()}
              onChange={(e) => {
                {
                  field.handleChange(e.target.value);
                  updatePostInputSession(form.state.values);
                }
              }}
              classNames={{
                label: "z-1",
              }}
            />
            <FormErrorMessageComponent
              message={field.state.meta.errors[0]?.message}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="visitedDate">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <div className={formLabelStyle({ type: "required" })}>訪問日</div>
            <DatePicker
              selected={field.state.value}
              onChange={(date) => {
                const updateValue = date ?? field.state.value;
                field.setValue(updateValue);
                updatePostInputSession(form.state.values);
              }}
              dateFormat="yyyy/MM/dd"
              popperPlacement="bottom-start"
              customInput={<Input className={inputTextStyle()} />}
              popperClassName="!z-20"
            />
            <FormErrorMessageComponent
              message={field.state.meta.errors[0]?.message}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="isOpen">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <div className={formLabelStyle()}>公開設定</div>
            <Switch
              isSelected={field.state.value}
              onChange={(e) => {
                {
                  field.handleChange(e.target.checked);
                  updatePostInputSession(form.state.values);
                }
              }}
            >
              {field.state.value ? "公開" : "非公開"}
            </Switch>
          </div>
        )}
      </form.Field>
      <form.Field name="categoryIdList">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <div className="flex gap-4 items-center">
              <div className={formLabelStyle()}>カテゴリー</div>
              <Button
                color="success"
                disabled={!categoryList || categoryList.length === 0}
                onPress={() => {
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
                    updatePostInputSession(form.state.values);
                  }}
                  selectedIds={field.state.value}
                />
              </>
            )}
          </div>
        )}
      </form.Field>
      <form.Field name="urlList">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <div className="flex items-center">
              <div className={formLabelStyle()}>URL</div>
              <Tooltip
                content="投稿に関連するSNSやブログ等のURLを入力"
                placement="top-end"
                isOpen={openPopover}
                onOpenChange={(open) => setOpenPopover(open)}
              >
                <InformationCircleIcon
                  className="w-5 h-5 text-gray-400 mb-1 ml-1"
                  onClick={() => {
                    setOpenPopover(!openPopover);
                  }}
                />
              </Tooltip>
              <Button
                color="success"
                onPress={() => {
                  field.pushValue("");
                  updatePostInputSession(form.state.values);
                }}
                className="ml-6"
              >
                追加
              </Button>
            </div>
            {field.state.value.map((_, i) => {
              return (
                <form.Field key={i} name={`urlList[${i}]`}>
                  {(subField) => {
                    return (
                      <div className="flex gap-2 items-center mt-2">
                        <Input
                          name={subField.name}
                          value={subField.state.value}
                          onBlur={subField.handleBlur}
                          className={`${inputTextStyle()} min-w-[220px]`}
                          onChange={(e) => {
                            {
                              subField.handleChange(e.target.value);
                              updatePostInputSession(form.state.values);
                            }
                          }}
                          classNames={{
                            label: "z-1",
                          }}
                        />
                        <Button
                          color="default"
                          className={`min-w-[80px]`}
                          onPress={() => {
                            field.removeValue(i);
                            updatePostInputSession(form.state.values);
                          }}
                        >
                          削除
                        </Button>
                      </div>
                    );
                  }}
                </form.Field>
              );
            })}
          </div>
        )}
      </form.Field>
      <form.Field name="detail">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Textarea
              label="詳細など"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              className={inputTextStyle()}
              onChange={(e) => {
                {
                  field.handleChange(e.target.value);
                  updatePostInputSession(form.state.values);
                }
              }}
              classNames={{
                label: "z-1",
              }}
            />
          </div>
        )}
      </form.Field>
      <div className={formSubmitAreaStyle()}>
        <Button
          color="primary"
          disabled={disabledFlag}
          onPress={form.handleSubmit}
        >
          {editPostData ? "編集" : "登録"}
        </Button>
        <Button
          color="default"
          onPress={() => {
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
