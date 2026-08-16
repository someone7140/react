"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { toast } from "@heroui/react";

import {
  PostInputComponent,
  PostInputFormType,
} from "./input/PostInputComponent";
import { POST_MY_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import { RegisterPostDocument } from "@/graphql/gen/graphql";

export const PostRegisterComponent: FC = () => {
  const router = useRouter();
  const [addPost, { loading: addPostLoading }] =
    useMutation(RegisterPostDocument);

  const onSubmitRegister = async (form: PostInputFormType) => {
    const result = await addPost({
      variables: {
        title: form.title,
        contents: form.contents,
        status: form.status,
        tagNames: form.tagNames,
        description: form.description,
      },
    });

    if (result.error) {
      toast.danger("登録時にエラーが発生しました。");
      return;
    }

    toast.success("投稿を登録しました。");
    router.push(POST_MY_LIST_PAGE_PATH);
  };

  return (
    <PostInputComponent
      execSubmit={onSubmitRegister}
      disabledFlag={addPostLoading}
    />
  );
};
