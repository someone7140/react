"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Button, Input, Textarea } from "@heroui/react";

import { FormErrorMessageComponent } from "@/components/common/FormErrorMessageComponent";
import { POST_PLACE_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import { PostCategorySelectDialogComponent } from "@/components/postCategory/dialog/PostCategorySelectDialogComponent";
import { PostCategoryResponse, PostPlaceResponse } from "@/graphql/gen/graphql";
import {
  postPlaceInputFormSchema,
  PostPlaceInputFormType,
  usePostPlaceInputSessionStore,
} from "@/hooks/inputSessionStore/usePostPlaceInputSessionStore";
import {
  formItemAreaStyle,
  formLabelStyle,
  formSubmitAreaStyle,
  inputTextStyle,
} from "@/style/FormStyle";

type Props = {
  execSubmit: (form: PostPlaceInputFormType) => void;
  disabledFlag?: boolean;
  registeredPlace?: PostPlaceResponse;
  categoryList?: PostCategoryResponse[];
};

export const PostPlaceInputComponent: FC<Props> = ({
  execSubmit,
  disabledFlag,
  registeredPlace,
  categoryList,
}) => {
  const router = useRouter();
  const { postPlaceInputSession, updatePostPlaceInputSession } =
    usePostPlaceInputSessionStore();
  const [categorySelectDialogOpen, setCategorySelectDialogOpen] =
    useState(false);

  const initialValue: PostPlaceInputFormType = registeredPlace
    ? {
        name: registeredPlace.name ?? undefined,
        categoryIdList: registeredPlace.categoryIdList ?? [],
        address: registeredPlace.address ?? undefined,
        detail: registeredPlace.detail ?? undefined,
        url: registeredPlace.url ?? undefined,
      }
    : {
        name: "",
        categoryIdList: [] as string[],
        address: "",
        detail: "",
        url: "",
      };

  const form = useForm({
    validators: {
      onSubmit: postPlaceInputFormSchema,
    },
    defaultValues: postPlaceInputSession ? postPlaceInputSession : initialValue,
    onSubmit: async ({ value }) => {
      execSubmit(value);
    },
  });

  return (
    <form className="max-w-[95%]">
      <form.Field name="name">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Input
              label="場所名"
              isRequired
              name={field.name}
              value={field.state.value}
              className={inputTextStyle()}
              onChange={(e) => {
                field.handleChange(e.target.value);
                updatePostPlaceInputSession(form.state.values);
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
      <form.Field name="address">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Input
              label="住所"
              name={field.name}
              value={field.state.value}
              className={inputTextStyle()}
              classNames={{
                label: "z-1",
              }}
              onChange={(e) => {
                {
                  field.handleChange(e.target.value);
                  updatePostPlaceInputSession(form.state.values);
                }
              }}
            />
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
                    updatePostPlaceInputSession(form.state.values);
                  }}
                  selectedIds={field.state.value}
                />
              </>
            )}
          </div>
        )}
      </form.Field>
      <form.Field name="url">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Input
              label="参考URL"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              className={inputTextStyle()}
              classNames={{
                label: "z-1",
              }}
              onChange={(e) => {
                {
                  field.handleChange(e.target.value);
                  updatePostPlaceInputSession(form.state.values);
                }
              }}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="detail">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Textarea
              label="詳細"
              name={field.name}
              value={field.state.value}
              className={inputTextStyle()}
              classNames={{
                label: "z-1",
              }}
              onChange={(e) => {
                {
                  field.handleChange(e.target.value);
                  updatePostPlaceInputSession(form.state.values);
                }
              }}
            />
          </div>
        )}
      </form.Field>
      <div className={formSubmitAreaStyle()}>
        <Button
          color="primary"
          isLoading={disabledFlag}
          onPress={form.handleSubmit}
        >
          {registeredPlace ? "編集" : "登録"}
        </Button>
        <Button
          color="secondary"
          onPress={() => {
            router.push(POST_PLACE_LIST_PAGE_PATH);
          }}
        >
          一覧へ
        </Button>
      </div>
    </form>
  );
};
