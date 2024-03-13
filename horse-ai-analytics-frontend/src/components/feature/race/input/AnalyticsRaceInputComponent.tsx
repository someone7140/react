"use client";

import React, { FC } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetRaceInfoFromUrlLazyQuery } from "@/query/graphqlGen/graphql";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";
import {
  inputTextAreaStyle,
  inputTextStyle,
  requiredMark,
} from "@/styles/FormStyle";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";

export const analyticsRaceInputFormSchema = z.object({
  analyticsUrl: z.string().optional(),
  raceName: z
    .string({
      required_error: "レース名は必須です",
    })
    .min(1, {
      message: "レース名は必須です",
    }),
  prompt: z.string().optional(),
});

export const AnalyticsRaceInputComponent: FC = () => {
  const form = useForm<z.infer<typeof analyticsRaceInputFormSchema>>({
    resolver: zodResolver(analyticsRaceInputFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const [getRaceInfoQuery, { loading: raceLoading }] =
    useGetRaceInfoFromUrlLazyQuery();

  const onClickGetRaceInfo = async () => {
    const analyticsUrl = form.getValues("analyticsUrl");
    if (analyticsUrl) {
      const response = (
        await getRaceInfoQuery({
          variables: { url: analyticsUrl },
        })
      ).data?.getRaceInfoFromUrl;
      if (response) {
        form.reset({
          ...form.getValues(),
          raceName: response.raceName,
          prompt: response.prompt,
        });
      } else {
        toast({
          className: `${toastStyle({ textColor: "amber" })}`,
          variant: "destructive",
          description: "レース情報の取得に失敗しました。",
        });
      }
    } else {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "URLを入力してください。",
      });
    }
  };

  const copyToClipboardPrompt = async () => {
    await global.navigator.clipboard.writeText(form.getValues("prompt") ?? "");
    toast({
      className: `${toastStyle({ textColor: "black" })}`,
      variant: "default",
      description: "プロンプトをコピーしました。",
    });
  };

  const submitFunc = async (
    data: z.infer<typeof analyticsRaceInputFormSchema>
  ) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitFunc)}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-end">
            <FormField
              control={form.control}
              name="analyticsUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>情報取得URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={inputTextStyle()}
                      placeholder="ウマニティの出馬表URLを入力"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={buttonStyle({ color: "lime" })}
              disabled={raceLoading}
              onClick={onClickGetRaceInfo}
            >
              取得
            </Button>
          </div>
          <FormField
            control={form.control}
            name="raceName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={requiredMark()}>レース名</FormLabel>
                <FormControl>
                  <Input {...field} className={inputTextStyle()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-4 items-center">
                  <FormLabel>プロンプト</FormLabel>
                  <div
                    className="cursor-pointer"
                    onClick={copyToClipboardPrompt}
                  >
                    <Copy />
                  </div>
                </div>
                <FormControl>
                  <Textarea {...field} className={inputTextAreaStyle()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className={`${buttonStyle({ color: "indigo" })} mt-5`}
          type="submit"
          disabled={true}
        >
          <p>結果を登録</p>
        </Button>
      </form>
      {/*
      <AutoForm
        onSubmit={submitFunc}
        formSchema={analyticsRaceInputFormSchema}
        fieldConfig={{
          analyticsUrl: {
            fieldType: ({
              label,
              isRequired,
              field,
              fieldProps,
            }: AutoFormInputComponentProps) => (
              <div className="flex flex-row items-end gap-5">
                <FormItem>
                  <AutoFormLabel label={label} isRequired={isRequired} />
                  <FormControl>
                    <Input
                      type="text"
                      {...fieldProps.fieldPropsWithoutShowLabel}
                      className={inputTextStyle()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <Button
                  className={buttonStyle({ color: "lime" })}
                  disabled={!field.value}
                  onClick={}
                >
                  取得
                </Button>
              </div>
            ),
          },
          raceName: {
            inputProps: {
              className: inputTextStyle(),
            },
          },
          prompt: {
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
          disabled={true}
        >
          <p>結果を登録</p>
        </Button>
      </AutoForm>
      */}
    </Form>
  );
};
