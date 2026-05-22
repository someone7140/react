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
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import z from "zod";

import {
  formItemAreaStyle,
  formSubmitAreaStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import {} from "@/util/formUtil";
import { MarkDownInputComponent } from "@/components/common/MarkDownInputComponent";

export const POST_STATUSES = [
  { key: "DRAFT", label: "下書き" },
  { key: "OPEN", label: "公開" },
  { key: "PRIVATE", label: "非公開" },
];

export const postInputFormSchema = z.object({
  title: z.string(),
  status: z.enum(POST_STATUSES.map((p) => p.key)),
  contents: z.string(),
});

export type PostInputFormType = z.infer<typeof postInputFormSchema>;

type Props = {
  execSubmit: (form: PostInputFormType) => void;
  disabledFlag?: boolean;
  defaultValue?: PostInputFormType;
};

export const PostInputComponent: FC<Props> = ({
  execSubmit,
  disabledFlag,
  defaultValue,
}) => {
  const [form, fields] = useForm<PostInputFormType>({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postInputFormSchema });
    },
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
    defaultValue: {
      title: defaultValue?.title ?? "",
      status: defaultValue?.status ?? "DRAFT",
      contents: defaultValue?.contents ?? "",
    },
    async onSubmit(event, { submission }) {
      event.preventDefault();
      if (submission?.status !== "success") return;
      execSubmit(submission.value);
    },
  });

  return (
    <Form
      {...getFormProps(form)}
      validationErrors={form.allErrors}
      validationBehavior="aria"
    >
      <TextField
        isRequired
        name={fields.title.name}
        defaultValue={fields.title.initialValue}
        className={formItemAreaStyle()}
      >
        <Label>タイトル</Label>
        <Input className={inputTextStyle()} />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name={fields.contents.name}
        className={formItemAreaStyle()}
        defaultValue={fields.contents.initialValue}
      >
        <Label>内容</Label>
        <MarkDownInputComponent
          fieldName={fields.contents.name}
          defaultValue={fields.contents.initialValue}
          isInvalid={(fields.contents.errors?.length ?? 0) > 0}
        />
        <FieldError />
      </TextField>
      <Select
        isRequired
        name={fields.status.name}
        className={formItemAreaStyle()}
        defaultValue={fields.status.initialValue}
      >
        <Label>公開設定</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="DRAFT" textValue="DRAFT">
              {POST_STATUSES.find((p) => p.key === "DRAFT")?.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="OPEN" textValue="OPEN">
              {POST_STATUSES.find((p) => p.key === "OPEN")?.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="PRIVATE" textValue="PRIVATE">
              {POST_STATUSES.find((p) => p.key === "PRIVATE")?.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
      <div className={formSubmitAreaStyle()}>
        <Button type="submit" isDisabled={disabledFlag}>
          登録
        </Button>
      </div>
    </Form>
  );
};
