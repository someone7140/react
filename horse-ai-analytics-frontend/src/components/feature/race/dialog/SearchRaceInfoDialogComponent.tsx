"use client";

import React, { FC, useState } from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { cn } from "@/lib/utils";
import { RaceInfoListFilterInputObject } from "@/query/graphqlGen/graphql";
import { buttonStyle } from "@/styles/CommonStyle";
import { inputTextStyle } from "@/styles/FormStyle";

type Props = {
  filter?: RaceInfoListFilterInputObject;
  setFilter: React.Dispatch<
    React.SetStateAction<RaceInfoListFilterInputObject | undefined>
  >;
};

export const searchRaceInfoFormSchema = z.object({
  startRaceDate: z.date().optional(),
  endRaceDate: z.date().optional(),
  keyword: z.string().optional(),
});

export const SearchRaceInfoDialogComponent: FC<Props> = ({
  filter,
  setFilter,
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof searchRaceInfoFormSchema>>({
    resolver: zodResolver(searchRaceInfoFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      startRaceDate: filter?.startRaceDate
        ? new Date(filter?.startRaceDate)
        : undefined,
      endRaceDate: filter?.endRaceDate
        ? new Date(filter?.endRaceDate)
        : undefined,
      keyword: filter?.keyword ?? undefined,
    },
  });

  const submitFunc = async (data: z.infer<typeof searchRaceInfoFormSchema>) => {
    const startRaceDate = data.startRaceDate
      ? format(data.startRaceDate, "yyyy/MM/dd")
      : undefined;
    const endRaceDate = data.endRaceDate
      ? format(data.endRaceDate, "yyyy/MM/dd")
      : undefined;
    const keyword = data.keyword || undefined;

    if (startRaceDate || endRaceDate || keyword) {
      setFilter({ startRaceDate, endRaceDate, keyword });
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
            {filter.startRaceDate && (
              <div>・開始日付：{filter.startRaceDate}</div>
            )}
            {filter.endRaceDate && <div>・終了日付：{filter.endRaceDate}</div>}
            {filter.keyword && <div>・キーワード：{filter.keyword}</div>}
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
                  <FormItem>
                    <div>
                      <FormLabel>開始日付</FormLabel>
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
                              <span>検索対象にしたい開始日付を選択</span>
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
              <FormField
                control={form.control}
                name="endRaceDate"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel>終了日付</FormLabel>
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
                              <span>検索対象にしたい終了日付を選択</span>
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
              <FormField
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>キーワード</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={inputTextStyle()}
                        placeholder="検索対象にしたいワード"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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
