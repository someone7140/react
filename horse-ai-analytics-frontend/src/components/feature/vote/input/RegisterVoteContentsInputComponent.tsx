"use client";

import React, { FC } from "react";

import { Control, useFieldArray } from "react-hook-form";
import { z } from "zod";

import {
  defaultVoteContent,
  voteResultInputFormSchema,
} from "@/components/feature/vote/input/RegisterVoteInputComponent";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RaceMemo, RaceMemoCategory } from "@/query/graphqlGen/graphql";
import { buttonStyle } from "@/styles/CommonStyle";
import { inputTextAreaStyle, inputTextStyle } from "@/styles/FormStyle";

type Props = {
  control: Control<z.infer<typeof voteResultInputFormSchema>>;
  raceIndex: number;
  raceMemoList: RaceMemo[];
  memoCategories: RaceMemoCategory[];
};

export const RegisterVoteContentsInputComponent: FC<Props> = ({
  control,
  raceIndex,
  raceMemoList,
  memoCategories,
}) => {
  const {
    fields: voteRaceContentFields,
    prepend: voteRaceContentPrepend,
    remove: voteRaceContentRemove,
  } = useFieldArray({
    control,
    name: `voteRaceList.${raceIndex}.voteRaceContents`,
  });

  return (
    <div>
      <Button
        className={`${buttonStyle({ color: "yellow" })} mb-3`}
        onClick={() => {
          voteRaceContentPrepend(defaultVoteContent);
        }}
        type="button"
      >
        レースの投票を追加
      </Button>
      {voteRaceContentFields.map((c, index) => (
        <div className="flex-col gap-3" key={c.id}>
          {/* idはuseFieldArrayで割り当てられる値 */}
          <FormField
            control={control}
            name={`voteRaceList.${raceIndex}.voteRaceContents.${index}.contents`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>投票内容</FormLabel>
                <FormControl>
                  <Textarea {...field} className={inputTextAreaStyle()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`voteRaceList.${raceIndex}.voteRaceContents.${index}.mostPriorityMemoId`}
            render={({ field }) => (
              <FormItem className="min-w-[200px] mt-3 mb-3">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="最も重要視したメモ項目を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="dummy">
                      最も重要視したメモ項目を選択
                    </SelectItem>
                    {raceMemoList.map((memo) => {
                      const memoCategory = memoCategories.find((m) => {
                        return m.id === memo.categoryId;
                      });
                      return (
                        <SelectItem key={memo.id} value={memo.id}>
                          <div className="flex gap-1">
                            <div>{memo.title}</div>
                            {memoCategory && <div>:{memoCategory.name}</div>}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`voteRaceList.${raceIndex}.voteRaceContents.${index}.betAmount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>賭け金額</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={Number.isNaN(field.value) ? "" : field.value}
                    className={inputTextStyle()}
                    placeholder="賭け金額を数値で入力"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`voteRaceList.${raceIndex}.voteRaceContents.${index}.returnAmount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>払戻金額</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={Number.isNaN(field.value) ? "" : field.value}
                    className={inputTextStyle()}
                    placeholder="払戻金額を数値で入力"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {voteRaceContentFields.length > 1 && (
            <div className="mt-4 mb-2">
              <Button
                className={`${buttonStyle({ color: "gray" })} w-28`}
                onClick={() => {
                  voteRaceContentRemove(index);
                }}
                type="button"
              >
                投票内容を削除
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
