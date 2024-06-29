"use client";

import React, { FC, useEffect, useState } from "react";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CalendarInputItemComponent } from "@/components/feature/common/CalendarInputItemComponent";
import { LoadingSpinner } from "@/components/feature/common/LoadingComponent";
import { RegisterVoteContentsInputComponent } from "@/components/feature/vote/input/RegisterVoteContentsInputComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormCommonUtil } from "@/hooks/useFormCommonUtil";
import { numberInputConvert } from "@/lib/utils";
import { useGetRaceInfoForVoteResultQuery } from "@/query/graphqlGen/graphql";
import { buttonStyle } from "@/styles/CommonStyle";

export const voteResultInputFormSchema = z.object({
  raceDate: z.date({
    required_error: "日付は必須です",
  }),
  voteRaceList: z.array(
    z.object({
      raceId: z.string(),
      voteRaceContents: z.array(
        z.object({
          contentsId: z.string().optional(),
          mostPriorityMemoId: z.string().optional(),
          contents: z.string().optional(),
          betAmount: z.preprocess(
            numberInputConvert,
            z.number({
              required_error: "賭金額は必須です",
              invalid_type_error: "賭け金額は数値を入力してください",
            })
          ),
          returnAmount: z.preprocess(
            numberInputConvert,
            z.number({
              required_error: "払戻金額は必須です",
              invalid_type_error: "払戻金額は数値を入力してください",
            })
          ),
        })
      ),
    })
  ),
});

export const defaultVoteContent = {
  betAmount: NaN,
  returnAmount: NaN,
  mostPriorityMemoId: "dummy",
};

export const defaultRace = {
  raceId: "dummy",
  voteRaceContents: [defaultVoteContent],
};

type Props = {
  submitFunc: (data: z.infer<typeof voteResultInputFormSchema>) => void;
  registerDisabled?: boolean;
};

export const RegisterVoteInputComponent: FC<Props> = ({
  submitFunc,
  registerDisabled,
}) => {
  const { dateToString } = useFormCommonUtil();
  const [resetFlag, setResetFlag] = useState<boolean>(false);
  const defaultValues = {
    voteRaceList: [defaultRace],
  };

  const form = useForm<z.infer<typeof voteResultInputFormSchema>>({
    resolver: zodResolver(voteResultInputFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: defaultValues,
  });
  const control = form.control;
  const {
    fields: voteRaceFields,
    prepend: voteRacePrepend,
    remove: voteRaceRemove,
  } = useFieldArray({
    control,
    name: "voteRaceList",
  });

  const { data: raceInfoDetailsData, loading: raceInfoDetailsLoading } =
    useGetRaceInfoForVoteResultQuery({
      variables: {
        raceDate: form.watch("raceDate")
          ? dateToString(form.watch("raceDate"))
          : "",
      },
      fetchPolicy: "network-only",
      skip: !form.watch("raceDate"),
    });

  useEffect(() => {
    if (resetFlag) {
      form.reset({ ...defaultValues, raceDate: form.watch("raceDate") });
      setResetFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFlag]);

  const details = raceInfoDetailsData?.getRaceInfoDetailsByDate;
  const memoCategories = raceInfoDetailsData?.getRaceMemoCategoryList;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitFunc)}>
        <div className="flex flex-col gap-4 ml-2">
          <FormField
            control={form.control}
            name="raceDate"
            render={({ field }) => (
              <CalendarInputItemComponent
                title="投票を登録したいレース日付"
                onChange={(e) => {
                  field.onChange(e);
                  setResetFlag(true);
                }}
                value={field.value}
                placeholder="レース日付を選択"
                required={true}
              />
            )}
          />
          {raceInfoDetailsLoading && <LoadingSpinner />}
          {!raceInfoDetailsLoading && details && details.length === 0 && (
            <div>指定の日付で登録されているレースはありません</div>
          )}
          {!raceInfoDetailsLoading && details && details.length > 0 && (
            <>
              <div className="flex gap-4 items-center">
                <div>指定日のレース選択</div>
                {voteRaceFields.length < details.length && (
                  <div>
                    <Button
                      className={buttonStyle({ color: "lime" })}
                      onClick={() => {
                        voteRacePrepend(defaultRace);
                      }}
                      type="button"
                    >
                      レースを追加
                    </Button>
                  </div>
                )}
              </div>
              {voteRaceFields.map((race, index) => {
                return (
                  <Card key={race.id}>
                    <CardContent className="p-2 min-w-[350px]">
                      <div className="flex gap-4">
                        {/* idはuseFieldArrayで割り当てられる値 */}
                        <FormField
                          control={form.control}
                          name={`voteRaceList.${index}.raceId`}
                          render={({ field }) => (
                            <FormItem className="min-w-[200px]">
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="レースを選択" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="dummy">
                                    レースを選択
                                  </SelectItem>
                                  {details
                                    ?.filter((v) => {
                                      if (field.value === v.id) {
                                        return true;
                                      }
                                      return !form
                                        .watch("voteRaceList")
                                        .some(
                                          (f) =>
                                            f.raceId === v.id && field.value
                                        );
                                    })
                                    .map((detail) => {
                                      return (
                                        <SelectItem
                                          key={detail.id}
                                          value={detail.id}
                                        >
                                          {detail.raceName}
                                        </SelectItem>
                                      );
                                    })}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {voteRaceFields.length > 1 && (
                          <div>
                            <Button
                              className={`${buttonStyle({
                                color: "gray",
                              })} w-18`}
                              onClick={() => {
                                voteRaceRemove(index);
                              }}
                              type="button"
                            >
                              レースを削除
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <RegisterVoteContentsInputComponent
                          control={form.control}
                          raceIndex={index}
                          raceMemoList={
                            details.find((d) => {
                              return (
                                d.id ===
                                form.watch(`voteRaceList.${index}.raceId`)
                              );
                            })?.memoList ?? []
                          }
                          memoCategories={memoCategories ?? []}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          )}
          <div className="flex flex-row justify-center mt-5">
            <Button
              className={`${buttonStyle({ color: "indigo" })}`}
              type="submit"
              disabled={
                (registerDisabled ?? true) ||
                form.watch("voteRaceList").filter((v) => v.raceId !== "dummy")
                  .length < 1
              }
            >
              <p>投票内容を登録</p>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
