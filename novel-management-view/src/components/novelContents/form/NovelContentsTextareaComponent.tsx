"use client";

import { FC, useState } from "react";
import { Control } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import z from "zod";

import { novellContentsInputFormSchema } from "./novelContentsFormUtil";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { novelTextareaStyle } from "@/style/NovelStyle";
import { formLabelStyle } from "@/style/FormStyle";

type Props = {
  control: Control<z.infer<typeof novellContentsInputFormSchema>>;
};

export const NovelContentsTextareaComponent: FC<Props> = ({ control }) => {
  const [accordionValue, setAccordionValue] = useState<string>("");

  return (
    <Accordion
      type="single"
      collapsible
      value={accordionValue}
      onValueChange={setAccordionValue}
    >
      <AccordionItem value="contentsText">
        <AccordionTrigger className={`${formLabelStyle()} cursor-pointer`}>
          執筆内容
        </AccordionTrigger>
        <AccordionContent>
          <FormField
            control={control}
            name="contents"
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
