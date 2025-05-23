"use client";

import React, { FC, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Textarea,
  Typography,
} from "@material-tailwind/react";

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
  inputTextLabelStyle,
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
  const [openPopover, setOpenPopover] = useState(false);

  const popoverTriggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <form>
      <form.Field name="userSettingId">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <Typography className={formLabelStyle({ type: "required" })}>
              ユーザID
            </Typography>
            <Input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              placeholder="半角文字で入力"
              className={inputTextStyle()}
              labelProps={{
                className: inputTextLabelStyle(),
              }}
              onChange={(e) => {
                {
                  field.handleChange(e.target.value);
                  updateUserAccountInputSession(form.state.values);
                }
              }}
              crossOrigin={undefined}
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
              onChange={(e) => {
                {
                  field.handleChange(e.target.value);
                  updateUserAccountInputSession(form.state.values);
                }
              }}
              crossOrigin={undefined}
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
            <Typography className={formLabelStyle()}>
              プロフィール詳細
            </Typography>
            <Textarea
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              className={inputTextStyle()}
              onChange={(e) => {
                field.handleChange(e.target.value);
                updateUserAccountInputSession(form.state.values);
              }}
              labelProps={{
                className: inputTextLabelStyle(),
              }}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="urlList">
        {(field) => (
          <div className={formItemAreaStyle()}>
            <div className="flex items-center">
              <Typography className={formLabelStyle()}>URL</Typography>
              <Popover
                placement="top"
                open={openPopover}
                handler={setOpenPopover}
              >
                <PopoverHandler {...popoverTriggers}>
                  <InformationCircleIcon className="w-5 h-5 text-gray-400 mb-1 ml-1" />
                </PopoverHandler>
                <PopoverContent>
                  <span>プロフィールに関するSNSやブログ等のURLを入力</span>
                </PopoverContent>
              </Popover>
              <Button
                color="light-green"
                onClick={() => {
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
                          labelProps={{
                            className: inputTextLabelStyle(),
                          }}
                          onChange={(e) => {
                            subField.handleChange(e.target.value);
                            updateUserAccountInputSession(form.state.values);
                          }}
                          crossOrigin={undefined}
                        />
                        <Button
                          color="blue-gray"
                          className={`min-w-[80px]`}
                          onClick={() => {
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
            <Typography className={formLabelStyle()}>アイコン画像</Typography>
            <label>
              <div>
                <Button
                  variant="filled"
                  color="light-blue"
                  onClick={() => {
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
          color="indigo"
          disabled={disabledFlag}
          onClick={form.handleSubmit}
        >
          登録
        </Button>
      </div>
    </form>
  );
};
