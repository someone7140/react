"use client";

import { FC } from "react";
import { Control } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formLabelStyle } from "@/style/FormStyle";
import { novelTextareaStyle } from "@/style/NovelStyle";
import { NovelContentsChildrenInputFormType } from "./NovelContentsChildrenComponent";
import { NovelContentsAccordionComponent } from "../form/NovelContentsAccordionComponent";

type Props = {
  control: Control<NovelContentsChildrenInputFormType>;
  index: number;
};

export const NovelContentsChildComponent: FC<Props> = ({ control, index }) => {
  return (
    <div className="flex flex-col gap-3 items-center w-[100%]">
      <FormField
        control={control}
        name={`contentsList.${index}.chapterName`}
        render={({ field }) => (
          <FormItem className="w-[95%]">
            <FormLabel className={formLabelStyle({ type: "required" })}>
              見出し名
            </FormLabel>
            <FormControl>
              <Input {...field} className="max-w-[300px]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`contentsList.${index}.displayOrder`}
        render={({ field }) => (
          <FormItem className="w-[95%]">
            <FormLabel className={formLabelStyle()}>表示順</FormLabel>
            <FormControl>
              <Input {...field} className="max-w-[200px]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`contentsList.${index}.description`}
        render={({ field }) => (
          <FormItem className="w-[95%]">
            <FormLabel className={formLabelStyle()}>概要</FormLabel>
            <FormControl>
              <TextareaAutosize
                {...field}
                className={novelTextareaStyle()}
                minRows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="w-[95%]">
        <NovelContentsAccordionComponent
          contentNode={
            <FormField
              control={control}
              name={`contentsList.${index}.contents`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextareaAutosize
                      {...field}
                      className={`${novelTextareaStyle()} w-[90%] ml-1 mt-2`}
                      minRows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          }
          style={formLabelStyle()}
        />
      </div>
    </div>
  );
};
