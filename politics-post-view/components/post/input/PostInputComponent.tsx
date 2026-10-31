"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useLazyQuery } from "@apollo/client/react";
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
import { useRequest } from "ahooks";
import z from "zod";

import { MarkDownInputComponent } from "@/components/common/MarkDownInputComponent";
import { TagInputComponent } from "@/components/common/TagInputComponent";
import { POST_STATUS_KEYS, POST_STATUSES } from "@/constants/PostConstants";
import { POST_MY_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
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
  const router = useRouter();
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
    },
    async onSubmit(event, { submission }) {
      event.preventDefault();
      if (submission?.status !== "success") return;
      execSubmit(submission.value);
    },
  });
  const [currentTags, setCurrentTags] = useState(
    () => defaultValue?.tagNames ?? [],
  );

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
          defaultValues={defaultValue?.tagNames ?? []}
          selectList={postTags?.getPostTags?.map((t) => t.tagName) ?? []}
          fetchSelectList={(keyword: string) => {
            searchTags({ variables: { keyword: keyword, isOpenOnly: false } });
          }}
          onChangeTags={(tags: string[]) => {
            setCurrentTags(tags);
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
          {defaultValue ? "編集する" : "登録"}
        </Button>
        {defaultValue && (
          <Button
            type="button"
            variant="outline"
            onPress={() => router.push(POST_MY_LIST_PAGE_PATH)}
          >
            一覧へ戻る
          </Button>
        )}
      </div>
    </Form>
  );
};
