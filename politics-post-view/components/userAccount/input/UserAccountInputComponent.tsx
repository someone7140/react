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
};

export const UserAccountInputComponent: FC<Props> = ({
  execSubmit,
  disabledFlag,
}) => {
  const [form, fields] = useForm<UserAccountInputFormType>({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: userAccountInputFormSchema });
    },
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
    defaultValue: {
      urlList: [],
    },
    async onSubmit(event, { submission }) {
      event.preventDefault();
      if (submission?.status !== "success") return;
      console.log(submission.value);
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
        className={formItemAreaStyle()}
      >
        <Label>ユーザーID</Label>
        <Input placeholder="半角文字で入力" className={inputTextStyle()} />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name={fields.name.name}
        className={formItemAreaStyle()}
      >
        <Label>ユーザー名</Label>
        <Input className={inputTextStyle()} />
        <FieldError />
      </TextField>
      <TextField name={fields.detail.name} className={formItemAreaStyle()}>
        <Label>詳細</Label>
        <TextArea className={inputTextStyle()} rows={3} />
        <FieldError />
      </TextField>
      <div className="flex gap-3 mb-1 items-center">
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
      {urlList.map((url) => (
        <TextField
          key={url.key}
          name={url.name}
          className={formItemAreaStyle()}
        >
          <Input className={inputTextStyle()} />
          <FieldError />
        </TextField>
      ))}
      <div className={formSubmitAreaStyle()}>
        <Button type="submit" isDisabled={disabledFlag}>
          登録
        </Button>
      </div>
    </Form>
  );
};
