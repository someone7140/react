"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Button, Input, NumberInput, Textarea } from "@heroui/react";

import { FormErrorMessageComponent } from "@/components/common/FormErrorMessageComponent";
import { POST_CATEGORY_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import { PostCategorySelectDialogComponent } from "@/components/postCategory/dialog/PostCategorySelectDialogComponent";
import {
  PostCategoryResponse,
  useGetMyPostCategoriesQuery,
} from "@/graphql/gen/graphql";
import {
  postCategoryInputFormSchema,
  PostCategoryInputFormType,
  usePostCategoryInputSessionStore,
} from "@/hooks/inputSessionStore/usePostCategoryInputSessionStore";
import {
  formItemAreaStyle,
  formLabelStyle,
  formSubmitAreaStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import { getRootCategoryList } from "@/utils/postUtil";

type Props = {
  execSubmit: (form: PostCategoryInputFormType) => void;
  disabledFlag?: boolean;
  registeredCategory?: PostCategoryResponse;
};

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
  const { postCategoryInputSession, updatePostCategoryInputSession } =
    usePostCategoryInputSessionStore();

  const form = useForm({
    validators: {
      onSubmit: postCategoryInputFormSchema,
    },
    defaultValues: postCategoryInputSession
      ? postCategoryInputSession
      : registeredCategory
      ? {
          name: registeredCategory.name,
          parentCategoryId: registeredCategory.parentCategoryId ?? "",
          displayOrder:
            registeredCategory.displayOrder != null
              ? registeredCategory.displayOrder
              : undefined,
          detail: registeredCategory.detail ?? "",
        }
      : {
          name: "",
          parentCategoryId: "",
          detail: "",
        },
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
      <form.Field name="name">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Input
              label="カテゴリー名"
              isRequired
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              className={inputTextStyle()}
              onChange={(e) => {
                {
                  field.handleChange(e.target.value);
                  updatePostCategoryInputSession(form.state.values);
                }
              }}
            />
            <FormErrorMessageComponent
              message={field.state.meta.errors[0]?.message}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="displayOrder">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <NumberInput
              hideStepper
              label="表示順"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              className={inputTextStyle()}
              onChange={(e) => {
                if (typeof e === "number") {
                  field.handleChange(e);
                  updatePostCategoryInputSession(form.state.values);
                }
              }}
            />
            <FormErrorMessageComponent
              message={field.state.meta.errors[0]?.message}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="parentCategoryId">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <div className="flex gap-4 items-center">
              <div className={formLabelStyle()}>親カテゴリー</div>
              <Button
                color="warning"
                disabled={selectCategoryList.length === 0}
                onPress={() => {
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
                    updatePostCategoryInputSession(form.state.values);
                    setParentCategorySelectDialogOpen(false);
                  }}
                  selectedIds={field.state.value ? [field.state.value] : []}
                />
              </>
            )}
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
              onBlur={field.handleBlur}
              className={inputTextStyle()}
              onChange={(e) => {
                field.handleChange(e.target.value);
                updatePostCategoryInputSession(form.state.values);
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
          {registeredCategory ? "編集" : "登録"}
        </Button>
        <Button
          color="default"
          onPress={() => {
            router.push(POST_CATEGORY_LIST_PAGE_PATH);
          }}
        >
          一覧へ
        </Button>
      </div>
    </form>
  );
};
