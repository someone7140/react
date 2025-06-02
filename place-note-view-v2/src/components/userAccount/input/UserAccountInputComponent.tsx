"use client";

import React, { FC, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Button, Input, Textarea, Tooltip } from "@heroui/react";

import { FormErrorMessageComponent } from "@/components/common/FormErrorMessageComponent";
import {
  userAccountInputFormSchema,
  UserAccountInputFormType,
  useUserAccountInputSessionStore,
} from "@/hooks/inputSessionStore/useUserAccountInputSessionStore";
import { AccountUserResponse } from "@/graphql/gen/graphql";
import {
  formItemAreaStyle,
  formLabelStyle,
  formSubmitAreaStyle,
  inputTextStyle,
} from "@/style/FormStyle";

type Props = {
  execSubmit: (form: UserAccountInputFormType) => void;
  disabledFlag?: boolean;
  editUser?: AccountUserResponse;
  authToken?: string;
};

export const UserAccountInputComponent: FC<Props> = ({
  execSubmit,
  disabledFlag,
  editUser,
  authToken,
}) => {
  const { userAccountInputSession, updateUserAccountInputSession } =
    useUserAccountInputSessionStore();
  const form = useForm({
    validators: {
      onSubmit: userAccountInputFormSchema,
    },
    defaultValues: userAccountInputSession
      ? userAccountInputSession
      : editUser
      ? {
          userSettingId: editUser.userSettingId,
          name: editUser.name,
          detail: editUser.detail ?? "",
          urlList: editUser.urlList.length === 0 ? [""] : editUser.urlList,
        }
      : {
          userSettingId: "",
          name: "",
          detail: "",
          urlList: [""],
          authToken: authToken,
        },
    onSubmit: async ({ value }) => {
      execSubmit(value);
    },
  });
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isURLToolTipOpen, setIsURLToolTipOpen] = useState(false);

  return (
    <form>
      <form.Field name="userSettingId">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Input
              label="ユーザID"
              isRequired
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              placeholder="半角文字で入力"
              className={inputTextStyle()}
              onChange={(e) => {
                {
                  field.handleChange(e.target.value);
                  updateUserAccountInputSession(form.state.values);
                }
              }}
            />
            <FormErrorMessageComponent
              message={field.state.meta.errors[0]?.message}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="name">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Input
              label="ユーザ名"
              isRequired
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              className={inputTextStyle()}
              onChange={(e) => {
                {
                  field.handleChange(e.target.value);
                  updateUserAccountInputSession(form.state.values);
                }
              }}
            />
            <FormErrorMessageComponent
              message={field.state.meta.errors[0]?.message}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="detail">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Textarea
              label="プロフィール詳細"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              className={inputTextStyle()}
              onChange={(e) => {
                field.handleChange(e.target.value);
                updateUserAccountInputSession(form.state.values);
              }}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="urlList">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <div className="flex items-center">
              <div className={formLabelStyle()}>URL</div>
              <Tooltip
                content="プロフィールに関するSNSやブログ等のURLを入力"
                placement="top-end"
                isOpen={isURLToolTipOpen}
                onOpenChange={(open) => setIsURLToolTipOpen(open)}
              >
                <InformationCircleIcon
                  className="w-5 h-5 text-gray-400 mb-1 ml-1"
                  onClick={() => {
                    setIsURLToolTipOpen(!isURLToolTipOpen);
                  }}
                />
              </Tooltip>
              <Button
                color="success"
                onPress={() => {
                  field.pushValue("");
                  updateUserAccountInputSession(form.state.values);
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
                            subField.handleChange(e.target.value);
                            updateUserAccountInputSession(form.state.values);
                          }}
                        />
                        <Button
                          color="default"
                          className={`min-w-[80px]`}
                          onPress={() => {
                            field.removeValue(i);
                            updateUserAccountInputSession(form.state.values);
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
      <form.Field name="imageFile">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <div className={formLabelStyle()}>アイコン画像</div>
            <label>
              <div>
                <Button
                  color="success"
                  onPress={() => {
                    inputFileRef?.current?.click();
                  }}
                >
                  画像ファイル選択
                </Button>
              </div>
              <input
                ref={inputFileRef}
                type="file"
                name={field.name}
                className="hidden"
                onChange={(e) => {
                  form.setFieldValue("imageFile", e.target.files?.[0]);
                  updateUserAccountInputSession(form.state.values);
                }}
              />
            </label>
            {editUser?.imageUrl && !field.state.value && (
              <Image
                src={editUser.imageUrl}
                width={150}
                height={150}
                alt={editUser.name}
                className="mt-2"
              />
            )}
            {field.state.value?.name && (
              <Image
                src={URL.createObjectURL(field.state.value)}
                width={150}
                height={150}
                alt="image"
                className="mt-2"
              />
            )}
          </div>
        )}
      </form.Field>
      <div className={formSubmitAreaStyle()}>
        <Button
          color="primary"
          disabled={disabledFlag}
          onPress={form.handleSubmit}
        >
          登録
        </Button>
      </div>
    </form>
  );
};
