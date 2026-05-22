"use client";

import { FC } from "react";
import { useForm, getFormProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import z from "zod";

import {
  formItemAreaStyle,
  formSubmitAreaStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import { halfSizeRegex } from "@/util/formUtil";

export const userAccountInputFormSchema = z.object({
  userSettingId: z.string().regex(halfSizeRegex, "半角文字で入力してください"),
  name: z.string(),
  detail: z.string().optional(),
  urlList: z.string().array(),
});

export type UserAccountInputFormType = z.infer<
  typeof userAccountInputFormSchema
>;

type Props = {
  execSubmit: (form: UserAccountInputFormType) => void;
  disabledFlag?: boolean;
  defaultValue?: UserAccountInputFormType;
};

export const UserAccountInputComponent: FC<Props> = ({
  execSubmit,
  disabledFlag,
  defaultValue,
}) => {
  const [form, fields] = useForm<UserAccountInputFormType>({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: userAccountInputFormSchema });
    },
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
    defaultValue: {
      userSettingId: defaultValue?.userSettingId ?? "",
      name: defaultValue?.name ?? "",
      urlList: defaultValue?.urlList ?? [],
      detail: defaultValue?.detail ?? "",
    },
    async onSubmit(event, { submission }) {
      event.preventDefault();
      if (submission?.status !== "success") return;
      execSubmit(submission.value);
    },
  });

  const urlList = fields.urlList.getFieldList();

  return (
    <Form
      {...getFormProps(form)}
      validationErrors={form.allErrors}
      validationBehavior="aria"
    >
      <TextField
        isRequired
        name={fields.userSettingId.name}
        defaultValue={fields.userSettingId.initialValue}
        className={formItemAreaStyle()}
      >
        <Label>ユーザーID</Label>
        <Input placeholder="半角文字で入力" className={inputTextStyle()} />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name={fields.name.name}
        defaultValue={fields.name.initialValue}
        className={formItemAreaStyle()}
      >
        <Label>ユーザー名</Label>
        <Input className={inputTextStyle()} />
        <FieldError />
      </TextField>
      <TextField
        name={fields.detail.name}
        className={formItemAreaStyle()}
        defaultValue={fields.detail.initialValue}
      >
        <Label>詳細</Label>
        <TextArea className={inputTextStyle()} rows={3} />
        <FieldError />
      </TextField>
      <div className="flex gap-3 mb-2 items-center">
        <Label>URL</Label>
        <Button
          className={"bg-emerald-400"}
          size="sm"
          onPress={() => {
            form.insert({ name: fields.urlList.name });
          }}
        >
          追加
        </Button>
      </div>
      {urlList.map((url, i) => (
        <div className="flex gap-2" key={url.key}>
          <TextField
            name={url.name}
            defaultValue={url.initialValue}
            className={formItemAreaStyle()}
          >
            <Input className={`${inputTextStyle()} !min-w-[280px]`} />
            <FieldError />
          </TextField>
          <Icon
            className="cursor-pointer"
            icon="material-symbols:close-small"
            width="32"
            height="32"
            style={{ color: "#2A2A32" }}
            onClick={() => {
              form.remove({ name: fields.urlList.name, index: i });
            }}
          />
        </div>
      ))}
      <div className={formSubmitAreaStyle()}>
        <Button type="submit" isDisabled={disabledFlag}>
          登録
        </Button>
      </div>
    </Form>
  );
};
