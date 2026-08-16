"use client";

import { FC } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { useForm, getFormProps, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRequest } from "ahooks";
import z from "zod";

import { MarkDownInputComponent } from "@/components/common/MarkDownInputComponent";
import { TagInputComponent } from "@/components/common/TagInputComponent";
import { POST_STATUS_KEYS, POST_STATUSES } from "@/constants/PostConstants";
import {
  formItemAreaStyle,
  formSubmitAreaStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import {} from "@/util/formUtil";
import { GetPostTagsDocument } from "@/graphql/gen/graphql";

export const postInputFormSchema = z.object({
  title: z.string(),
  status: z.enum(POST_STATUS_KEYS),
  contents: z.string(),
  tagNames: z.string().array(),
  description: z.string().optional(),
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
  const [fetchTagsByKeyWord, { data: postTags }] = useLazyQuery(
    GetPostTagsDocument,
    {
      fetchPolicy: "network-only",
    },
  );

  const { run: searchTags } = useRequest(fetchTagsByKeyWord, {
    debounceWait: 500,
    manual: true,
  });

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
      tagNames: defaultValue?.tagNames ?? [],
      description: defaultValue?.description,
    },
    async onSubmit(event, { submission }) {
      event.preventDefault();
      if (submission?.status !== "success") return;
      execSubmit(submission.value);
    },
  });
  // tagNames 用の control を作る
  const tagNamesControl = useInputControl(fields.tagNames);
  const currentTags = (tagNamesControl.value as string[] | undefined) ?? [];

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
        name={fields.description.name}
        className={formItemAreaStyle()}
        defaultValue={fields.description.initialValue}
      >
        <Label>説明</Label>
        <TextArea className={inputTextStyle()} rows={3} />
        <FieldError />
      </TextField>
      <div className={formItemAreaStyle()}>
        <Label>タグ</Label>
        {/* タグの数だけ同名の hidden input を並べる */}
        {currentTags.map((tag, i) => (
          <input
            key={i}
            type="hidden"
            name={fields.tagNames.name}
            value={tag}
          />
        ))}
        <TagInputComponent
          defaultValues={[]}
          selectList={postTags?.getPostTags?.map((t) => t.tagName) ?? []}
          fetchSelectList={(keyword: string) => {
            searchTags({ variables: { keyword: keyword, isOpenOnly: false } });
          }}
          onChangeTags={(tags: string[]) => {
            form.update({
              name: fields.tagNames.name,
              value: tags,
            });
          }}
        />
      </div>
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
            {POST_STATUSES.map((postStatus) => (
              <ListBox.Item
                key={postStatus.key}
                id={postStatus.key}
                textValue={postStatus.key}
              >
                {postStatus.label}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
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
