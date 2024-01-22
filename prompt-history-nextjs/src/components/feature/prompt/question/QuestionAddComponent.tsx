"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { inputTextAreaStyle } from "@/styles/FormStyle";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";
import {
  useAddQuestionMutation,
  useGetThemeByIdDocumentQuery,
} from "@/query/graphqlGen/graphql";

type Props = {
  themeId: string;
};

const addQuestionSchema = z.object({
  question: z
    .string({
      required_error: "入力は必須です",
    })
    .min(1, {
      message: "入力は必須です",
    })
    .describe("AIへの質問プロンプト"),
});

export const QuestionAddComponent: FC<Props> = ({ themeId }) => {
  const router = useRouter();
  const {
    data: themeData,
    loading: themeLoading,
    error: themeError,
  } = useGetThemeByIdDocumentQuery({
    variables: { id: themeId },
  });
  const [addQuestion, { loading: loadingAddQuestion }] =
    useAddQuestionMutation();

  const submitFunc = async (form: z.infer<typeof addQuestionSchema>) => {
    const displayErrorToast = () => {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: <>登録に失敗しました。</>,
      });
    };

    try {
      const result = await addQuestion({
        variables: {
          themeId: themeId,
          question: form.question,
        },
      });
      if (result.errors) {
        displayErrorToast();
      } else {
        toast({
          className: `${toastStyle({ textColor: "black" })}`,
          description: "質問を登録しました。",
        });
        router.push(`/prompt/theme?id=${themeId}`);
      }
    } catch (e) {
      displayErrorToast();
    }
  };

  if (themeLoading) {
    return <LoadingSpinner />;
  } else {
    const theme = themeData?.problem_themes[0];
    if (themeError || !theme) {
    } else {
      return (
        <div>
          <div className="mb-2 break-all">「{theme.title}」の質問を登録</div>
          <AutoForm
            onSubmit={submitFunc}
            formSchema={addQuestionSchema}
            fieldConfig={{
              question: {
                fieldType: "textarea",
                inputProps: {
                  className: inputTextAreaStyle(),
                },
              },
            }}
          >
            <Button
              className={buttonStyle({ color: "indigo" })}
              type="submit"
              disabled={loadingAddQuestion}
            >
              <p>質問登録</p>
            </Button>
          </AutoForm>
        </div>
      );
    }
  }
};
