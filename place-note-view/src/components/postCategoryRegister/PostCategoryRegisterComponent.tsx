"use client";

import React, { FC, useState } from "react";

import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";

import { centerHorizonContainerStyle } from "@/style/CommonStyle";
import {
  formBlockStyle,
  inputLabelStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import { errorMessageStyle } from "@/style/MessageStyle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Field, Form } from "houseform";
import { z } from "zod";
import { ConnectError } from "@bufbuild/connect";
import { toast } from "react-toastify";

import {
  addPostCategory,
  getPostCategoryList,
  updatePostCategory,
} from "@/gen/placeNotePostCategoryService-PostCategoryService_connectquery";
import { PostCategoryResponse } from "@/gen/placeNotePostCategoryService_pb";

export type PostCategoryRegisterForm = {
  name: string;
  parentId?: string;
  memo?: string;
  displayOrder?: number;
};

type Props = {
  registeredPostCategory?: PostCategoryResponse;
};

export const PostCategoryRegisterComponent: FC<Props> = ({
  registeredPostCategory,
}) => {
  const router = useRouter();

  const { queryFn, queryKey } = getPostCategoryList.useQuery({});
  const { data } = useQuery({
    queryKey,
    queryFn,
    retry: 3,
    refetchOnWindowFocus: false,
  });
  const displayParentCategory = data
    ? data.categoryList.filter(
        (c) => !c.parentId && c.id !== registeredPostCategory?.id
      )
    : [];
  const registeredChildren = data
    ? data.categoryList.filter((c) => c.parentId === registeredPostCategory?.id)
    : [];

  const [errMsg, setErrMsg] = useState<string | undefined>(undefined);
  const {
    mutationFn: addPostCategoryMutationFn,
    onError: addPostCategoryMutationOnError,
  } = addPostCategory.useMutation({
    onError: (err) => {
      setErrMsg("登録時にエラーが発生しました");
    },
  });
  const {
    mutationFn: updatePostCategoryMutationFn,
    onError: updatePostCategoryMutationOnError,
  } = updatePostCategory.useMutation({
    onError: (err) => {
      setErrMsg("更新時にエラーが発生しました");
    },
  });

  const {
    mutate: registerPostCategoryMutate,
    isPending: registerPostCategoryLoading,
  } = useMutation<void, ConnectError, PostCategoryRegisterForm, unknown>({
    mutationFn: async (formValues: PostCategoryRegisterForm) => {
      setErrMsg(undefined);
      const displayOrder = Number.isInteger(formValues.displayOrder)
        ? formValues.displayOrder
        : undefined;
      if (!registeredPostCategory) {
        await addPostCategoryMutationFn({
          name: formValues.name,
          parentId: formValues.parentId,
          memo: formValues.memo,
          displayOrder: displayOrder,
        });
        toast("カテゴリーを登録しました");
      } else {
        await updatePostCategoryMutationFn({
          id: registeredPostCategory.id,
          name: formValues.name,
          parentId: formValues.parentId,
          memo: formValues.memo,
          displayOrder: displayOrder,
        });
        toast("カテゴリーを更新しました");
      }

      // 一覧へ
      router.push("/myCategory");
    },
    onError: (err) => {
      if (!registeredPostCategory && addPostCategoryMutationOnError) {
        addPostCategoryMutationOnError(err);
      }
      if (registeredPostCategory && updatePostCategoryMutationOnError) {
        updatePostCategoryMutationOnError(err);
      }
    },
  });

  const formSubmit = async (formValue: PostCategoryRegisterForm) => {
    registerPostCategoryMutate(formValue);
  };

  return (
    <Form<PostCategoryRegisterForm>
      onSubmit={(values) => {
        formSubmit(values);
      }}
    >
      {({ submit }) => (
        <div>
          <div className={`${centerHorizonContainerStyle()} mt-2`}>
            <div>
              <Field<string>
                name="name"
                onSubmitValidate={z.string().min(1, "名前の入力は必須です")}
                initialValue={registeredPostCategory?.name}
              >
                {({ value, setValue, errors }) => (
                  <div className={formBlockStyle()}>
                    <Label
                      htmlFor="name"
                      value="名前"
                      className={inputLabelStyle({ type: "required" })}
                    />
                    <TextInput
                      id="name"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className={inputTextStyle()}
                    />
                    {errors.map((error) => (
                      <p key={error} className={errorMessageStyle()}>
                        {error}
                      </p>
                    ))}
                  </div>
                )}
              </Field>
              {displayParentCategory.length > 0 && (
                <Field<string | undefined>
                  name="parentId"
                  initialValue={registeredPostCategory?.parentId}
                >
                  {({ value, setValue }) => (
                    <div className={formBlockStyle()}>
                      <Label
                        htmlFor="parentId"
                        value="親カテゴリー"
                        className={inputLabelStyle()}
                      />
                      {registeredChildren.length === 0 && (
                        <Select
                          id="parentId"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length === 0) {
                              setValue(undefined);
                            } else {
                              setValue(value);
                            }
                          }}
                          value={value ?? ""}
                        >
                          <option value={""}>未指定</option>
                          {displayParentCategory.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </Select>
                      )}
                      {registeredChildren.length > 0 && (
                        <span className="text-sm">
                          子カテゴリー登録済みのため設定不可
                        </span>
                      )}
                    </div>
                  )}
                </Field>
              )}
              <Field<string>
                name="memo"
                initialValue={registeredPostCategory?.memo}
              >
                {({ value, setValue }) => (
                  <div className={formBlockStyle()}>
                    <Label
                      htmlFor="memo"
                      value="メモ"
                      className={inputLabelStyle()}
                    />
                    <Textarea
                      id="memo"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className={inputTextStyle()}
                      rows={4}
                    />
                  </div>
                )}
              </Field>
              <Field<number | undefined>
                name="displayOrder"
                initialValue={registeredPostCategory?.displayOrder}
              >
                {({ value, setValue }) => (
                  <div className={formBlockStyle()}>
                    <Label htmlFor="displayOrder" value="順番（数字）" />
                    <TextInput
                      id="displayOrder"
                      value={value}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length === 0) {
                          setValue(undefined);
                        } else if (Number.isInteger(parseInt(value))) {
                          setValue(parseInt(value));
                        }
                      }}
                      className={inputTextStyle()}
                    />
                  </div>
                )}
              </Field>
              {errMsg && (
                <div className={`${formBlockStyle()} ${errorMessageStyle()}`}>
                  {errMsg}
                </div>
              )}
            </div>
          </div>
          <div className={`flex gap-6 justify-center mt-4`}>
            <Button
              color="success"
              pill
              disabled={registerPostCategoryLoading}
              onClick={() => {
                submit();
              }}
            >
              <p>登録</p>
            </Button>
            <Button
              color="dark"
              pill
              disabled={registerPostCategoryLoading}
              onClick={() => {
                router.push("/myCategory");
              }}
            >
              <p>一覧へ</p>
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};
