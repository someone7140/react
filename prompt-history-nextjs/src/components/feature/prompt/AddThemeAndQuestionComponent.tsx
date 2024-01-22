"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { GraphQLError } from "graphql/error/GraphQLError";

import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  AddThemeMutationVariables,
  useAddThemeAndQuestionMutation,
  useAddThemeMutation,
} from "@/query/graphqlGen/graphql";
import { inputTextAreaStyle, inputTextStyle } from "@/styles/FormStyle";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";

const addThemeAndQuestionSchema = z.object({
  themeTitle: z
    .string({
      required_error: "テーマの入力は必須です",
    })
    .min(1, {
      message: "テーマの入力は必須です",
    })
    .describe("課題テーマ"),
  themeDescription: z.string().optional().describe("テーマの内容"),
  question: z.string().optional().describe("AIへの質問プロンプト"),
});

export const AddThemeAndQuestionComponent: FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [addThemeAndQuestion, { loading: loadingAddThemeAndQuestion }] =
    useAddThemeAndQuestionMutation();
  const [addTheme, { loading: loadingAddTheme }] = useAddThemeMutation();

  const submitFunc = async (
    form: z.infer<typeof addThemeAndQuestionSchema>
  ) => {
    const displayErrorToast = () => {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: <>登録に失敗しました。</>,
      });
    };
    const displayRegisteredToast = () => {
      toast({
        className: `${toastStyle({ textColor: "black" })}`,
        description: "登録しました。",
      });
    };

    let errors: readonly GraphQLError[] | undefined = undefined;
    let themeId: string | null | undefined = undefined;
    // 質問の入力有無で呼ぶmutationを分ける
    try {
      if (form.question) {
        const result = await addThemeAndQuestion({
          variables: {
            themeTitle: form.themeTitle,
            themeDescription: form.themeDescription,
            question: form.question,
          },
        });
        errors = result.errors;
        themeId = result?.data?.insert_problem_themes_one?.id;
      } else {
        const mutationVariables: AddThemeMutationVariables = {
          themeTitle: form.themeTitle,
          themeDescription: form.themeDescription,
        };
        const result = await addTheme({
          variables: mutationVariables,
        });
        errors = result.errors;
        themeId = result?.data?.insert_problem_themes_one?.id;
      }

      if (errors) {
        displayErrorToast();
      } else {
        displayRegisteredToast();
        router.push(`/prompt/theme?id=${themeId}`);
      }
    } catch (e) {
      displayErrorToast();
    }
  };

  return (
    <div>
      <AutoForm
        onSubmit={submitFunc}
        formSchema={addThemeAndQuestionSchema}
        fieldConfig={{
          themeTitle: {
            inputProps: {
              className: inputTextStyle(),
            },
          },
          themeDescription: {
            fieldType: "textarea",
            inputProps: {
              className: inputTextAreaStyle(),
            },
          },
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
          disabled={loadingAddThemeAndQuestion || loadingAddTheme}
        >
          <p>追加</p>
        </Button>
      </AutoForm>
    </div>
  );
};
