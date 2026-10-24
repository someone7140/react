"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client/react";
import { Spinner, toast } from "@heroui/react";

import {
  PostInputComponent,
  PostInputFormType,
} from "./input/PostInputComponent";
import { PostCommitConfirmModalComponent } from "./modal/PostCommitConfirmModalComponent";
import { POST_MY_LIST_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  GetMyPostsDocument,
  RegisterPostDocument,
} from "@/graphql/gen/graphql";

type Props = {
  postId: string;
};

export const PostEditComponent: FC<Props> = ({ postId }) => {
  const { data, loading } = useQuery(GetMyPostsDocument, {
    fetchPolicy: "network-only",
    variables: { id: postId },
  });
  const router = useRouter();
  const [addPost, { loading: addPostLoading }] =
    useMutation(RegisterPostDocument);
  const [formData, setFormData] = useState<PostInputFormType | undefined>(
    undefined,
  );

  const onSubmitRegister = async (form: PostInputFormType) => {
    if (form.status === "DRAFT") {
      registerExec(form);
      return;
    }

    setFormData(form);
  };

  const registerExec = async (form: PostInputFormType) => {
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

    toast.success("登録しました。");
    router.push(POST_MY_LIST_PAGE_PATH);
  };

  const onChangeCommitConfirmModal = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData(undefined);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <>
      <PostInputComponent
        execSubmit={onSubmitRegister}
        disabledFlag={addPostLoading}
        defaultValue={defaultFormValue}
      />
      <PostCommitConfirmModalComponent
        isOpen={formData !== undefined}
        setIsOpen={onChangeCommitConfirmModal}
        submitExec={async () => {
          if (formData) {
            registerExec(formData);
          }
        }}
      />
    </>
  );
};
