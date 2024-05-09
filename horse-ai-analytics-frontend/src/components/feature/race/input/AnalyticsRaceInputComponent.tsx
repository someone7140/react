"use client";

import React, { FC, useState } from "react";

import { parse } from "date-fns";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CalendarInputItemComponent } from "@/components/feature/common/CalendarInputItemComponent";
import { AnalyticsRaceOddsTableComponent } from "@/components/feature/race/ref/AnalyticsRaceOddsTableComponent";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useRaceInfoCommonUtil } from "@/hooks/useRaceInfoCommonUtil";
import {
  OddsInfoResponse,
  RaceInfoDetail,
  useGetRaceInfoFromUrlLazyQuery,
} from "@/query/graphqlGen/graphql";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";
import {
  inputTextAreaStyle,
  inputTextStyle,
  requiredMark,
} from "@/styles/FormStyle";

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
      evaluation: z.preprocess(
        (v) => {
          const valueStr = String(v);
          if (v != null && valueStr) {
            return parseInt(valueStr);
          }
          return undefined;
        },
        z
          .number({
            invalid_type_error: "評価値は数値を入力してください",
          })
          .optional()
      ),
    })
  ),
});

type Props = {
  submitFunc: (data: z.infer<typeof analyticsRaceInputFormSchema>) => void;
  registerDisabled?: boolean;
  raceInfo?: RaceInfoDetail;
};

export const AnalyticsRaceInputComponent: FC<Props> = ({
  submitFunc,
  registerDisabled,
  raceInfo,
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof analyticsRaceInputFormSchema>>({
    resolver: zodResolver(analyticsRaceInputFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: raceInfo
      ? {
          analyticsUrl: raceInfo.analyticsUrl?.toString() ?? undefined,
          raceName: raceInfo.raceName,
          raceDate: raceInfo.raceDate
            ? parse(raceInfo.raceDate, "yyyy/MM/dd", new Date())
            : undefined,
          prompt: raceInfo.prompt?.toString() ?? undefined,
          memoList: raceInfo.memoList.map((memo) => {
            return {
              memoId: memo.id,
              title: memo.title?.toString() ?? undefined,
              contents: memo.contents?.toString() ?? undefined,
              evaluation: memo.evaluation ?? undefined,
            };
          }),
        }
      : {
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

  const [getRaceInfoFromUrlQuery, { loading: getRaceInfoFromUrlLoading }] =
    useGetRaceInfoFromUrlLazyQuery();
  const [oddsInfo, setOddsInfo] = useState<OddsInfoResponse | undefined>(
    undefined
  );
  const { copyToClipboard } = useRaceInfoCommonUtil();

  const onClickGetRaceInfo = async () => {
    const analyticsUrl = form.getValues("analyticsUrl");
    if (analyticsUrl) {
      const response = (
        await getRaceInfoFromUrlQuery({
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
              disabled={getRaceInfoFromUrlLoading}
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
              <CalendarInputItemComponent
                title="レース日付"
                onChange={field.onChange}
                value={field.value}
                placeholder="レース日付を選択"
                required={true}
              />
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
                    onClick={() => {
                      copyToClipboard(
                        form.getValues("prompt") ?? "",
                        "プロンプト"
                      );
                    }}
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
                memoPrepend({
                  memoId: undefined,
                  title: "",
                  contents: "",
                  evaluation: undefined,
                });
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
                <FormField
                  control={form.control}
                  name={`memoList.${index}.evaluation`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className={inputTextStyle()}
                          placeholder="内容評価を数値で入力"
                        />
                      </FormControl>
                      <FormMessage />
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
        {raceInfo ? (
          <div className="flex flex-row justify-center items-center gap-8 mt-5">
            <Button
              className={`${buttonStyle({ color: "indigo" })} mt-5`}
              type="submit"
              disabled={registerDisabled}
            >
              <p>編集する</p>
            </Button>
            <Button
              className={`${buttonStyle({ color: "cyan" })} mt-5`}
              type="button"
              onClick={() => {
                router.push("/race/raceInfoList");
              }}
            >
              <p>一覧へ</p>
            </Button>
          </div>
        ) : (
          <div className="flex flex-row justify-center mt-5">
            <Button
              className={`${buttonStyle({ color: "indigo" })}`}
              type="submit"
              disabled={registerDisabled}
            >
              <p>結果を登録</p>
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
