"use client";

import React, { FC, useState } from "react";

import { format, parse } from "date-fns";
import { CalendarIcon, Copy } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AnalyticsRaceOddsTableComponent } from "@/components/feature/race/AnalyticsRaceOddsTableComponent";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  OddsInfoResponse,
  useAddRaceInfoMutation,
  useGetRaceInfoFromUrlLazyQuery,
} from "@/query/graphqlGen/graphql";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";
import {
  inputTextAreaStyle,
  inputTextStyle,
  requiredMark,
} from "@/styles/FormStyle";
import { useRouter } from "next/navigation";

export const analyticsRaceInputFormSchema = z.object({
  analyticsUrl: z.string().optional(),
  raceName: z
    .string({
      required_error: "レース名は必須です",
    })
    .min(1, {
      message: "レース名は必須です",
    }),
  raceDate: z.date({
    required_error: "日付は必須です",
  }),
  prompt: z.string().optional(),
  memoList: z.array(
    z.object({
      memoId: z.string().optional(),
      title: z.string().optional(),
      contents: z.string().optional(),
    })
  ),
});

export const AnalyticsRaceInputComponent: FC = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof analyticsRaceInputFormSchema>>({
    resolver: zodResolver(analyticsRaceInputFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      memoList: [{}],
    },
  });
  const control = form.control;
  const {
    fields: memoFields,
    prepend: memoPrepend,
    remove: memoRemove,
  } = useFieldArray({
    control,
    name: "memoList",
  });

  const [getRaceInfoQuery, { loading: raceLoading }] =
    useGetRaceInfoFromUrlLazyQuery();
  const [oddsInfo, setOddsInfo] = useState<OddsInfoResponse | undefined>(
    undefined
  );
  const [addRaceInfoMutation, { loading: loadingAddRaceInfoMutation }] =
    useAddRaceInfoMutation();

  const onClickGetRaceInfo = async () => {
    const analyticsUrl = form.getValues("analyticsUrl");
    if (analyticsUrl) {
      const response = (
        await getRaceInfoQuery({
          variables: { url: analyticsUrl },
        })
      ).data?.getRaceInfoFromUrl;
      if (response) {
        const raceDate = parse(
          response.raceDateYyyyMmDd,
          "yyyy/MM/dd",
          new Date()
        );
        form.reset({
          ...form.getValues(),
          raceName: response.raceName,
          raceDate: raceDate,
          prompt: response.prompt,
        });
        setOddsInfo(response.odds ?? undefined);
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
  ) => {
    const result = await addRaceInfoMutation({
      variables: {
        raceName: data.raceName,
        analyticsUrl: data.analyticsUrl,
        raceDate: data.raceDate.toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        prompt: data.prompt,
        memoList: data.memoList.filter((memo) => memo.contents || memo.title),
      },
    });
    if (result.data) {
      toast({
        className: `${toastStyle({ textColor: "black" })}`,
        variant: "default",
        description: "レース情報を登録しました",
      });
      router.push("/race/raceInfoList");
    } else {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "レース情報の登録に失敗しました。",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitFunc)}>
        <div className="flex flex-col gap-4 ml-2">
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
              type="button"
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
            name="raceDate"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className={requiredMark()}>レース日付</FormLabel>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy/MM/dd")
                        ) : (
                          <span>レース日付を選択</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {oddsInfo && <AnalyticsRaceOddsTableComponent oddsInfo={oddsInfo} />}
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
          <div className="flex flex-row gap-2 items-center">
            <FormLabel>メモ（AI回答など）</FormLabel>
            <Button
              className={buttonStyle({ color: "lime" })}
              onClick={() => {
                memoPrepend({});
              }}
              type="button"
            >
              メモを追加
            </Button>
          </div>
          {memoFields.map((memo, index) => (
            <>
              {/* idはuseFieldArrayで割り当てられる値 */}
              <div key={memo.id} className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name={`memoList.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className={inputTextStyle()}
                          placeholder="メモのタイトルを入力"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`memoList.${index}.contents`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          className={inputTextAreaStyle()}
                          placeholder="メモの内容を入力"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className={`${buttonStyle({ color: "gray" })} w-28`}
                  onClick={() => {
                    memoRemove(index);
                  }}
                  type="button"
                >
                  メモを削除
                </Button>
              </div>
            </>
          ))}
        </div>
        <Button
          className={`${buttonStyle({ color: "indigo" })} mt-5`}
          type="submit"
          disabled={loadingAddRaceInfoMutation}
        >
          <p>結果を登録</p>
        </Button>
      </form>
    </Form>
  );
};
