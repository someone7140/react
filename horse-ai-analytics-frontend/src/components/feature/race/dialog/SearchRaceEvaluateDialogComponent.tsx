"use client";

import React, { FC, useState } from "react";

import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CalendarInputItemComponent } from "@/components/feature/common/CalendarInputItemComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { GetRaceEvaluationQueryVariables } from "@/query/graphqlGen/graphql";
import { buttonStyle } from "@/styles/CommonStyle";

type Props = {
  filter?: GetRaceEvaluationQueryVariables;
  setFilter: React.Dispatch<
    React.SetStateAction<GetRaceEvaluationQueryVariables | undefined>
  >;
};

export const searchRaceEvaluateFormSchema = z.object({
  startRaceDate: z.date().optional(),
  endRaceDate: z.date().optional(),
});

export const SearchRaceEvaluateDialogComponent: FC<Props> = ({
  filter,
  setFilter,
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof searchRaceEvaluateFormSchema>>({
    resolver: zodResolver(searchRaceEvaluateFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      startRaceDate: filter?.startRaceDateFilter
        ? new Date(filter?.startRaceDateFilter)
        : undefined,
      endRaceDate: filter?.endRaceDateFilter
        ? new Date(filter?.endRaceDateFilter)
        : undefined,
    },
  });

  const submitFunc = async (
    data: z.infer<typeof searchRaceEvaluateFormSchema>
  ) => {
    const startRaceDateFilter = data.startRaceDate
      ? format(data.startRaceDate, "yyyy/MM/dd")
      : undefined;
    const endRaceDateFilter = data.endRaceDate
      ? format(data.endRaceDate, "yyyy/MM/dd")
      : undefined;

    if (startRaceDateFilter || endRaceDateFilter) {
      setFilter({ startRaceDateFilter, endRaceDateFilter });
    } else {
      setFilter(undefined);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-row items-center gap-4">
        <DialogTrigger asChild>
          <Button className={buttonStyle({ color: "cyan" })}>
            検索条件の設定
          </Button>
        </DialogTrigger>
        {filter && (
          <Button
            className={buttonStyle({ color: "gray" })}
            onClick={() => {
              setFilter(undefined);
            }}
          >
            検索条件のクリア
          </Button>
        )}
      </div>
      {filter && (
        <>
          <div className="mt-2">検索条件</div>
          <div className="flex flex-col">
            {filter.startRaceDateFilter && (
              <div>・開始日付：{filter.startRaceDateFilter}</div>
            )}
            {filter.endRaceDateFilter && (
              <div>・終了日付：{filter.endRaceDateFilter}</div>
            )}
          </div>
        </>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitFunc)}>
            <DialogTitle>検索条件</DialogTitle>
            <div className="flex flex-col gap-2 ml-2 mt-2">
              <FormField
                control={form.control}
                name="startRaceDate"
                render={({ field }) => (
                  <CalendarInputItemComponent
                    title="開始日付"
                    onChange={field.onChange}
                    value={field.value}
                    placeholder="検索対象にしたい開始日付を選択"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="endRaceDate"
                render={({ field }) => (
                  <CalendarInputItemComponent
                    title="終了日付"
                    onChange={field.onChange}
                    value={field.value}
                    placeholder="検索対象にしたい終了日付を選択"
                  />
                )}
              />
            </div>
            <DialogFooter className="flex flex-row items-center gap-8 mt-5">
              <Button
                type="submit"
                className={buttonStyle({ color: "indigo" })}
              >
                設定
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  className={buttonStyle({ color: "gray" })}
                >
                  キャンセル
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
