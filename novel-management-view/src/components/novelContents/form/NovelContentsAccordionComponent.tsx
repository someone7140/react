"use client";

import { FC, ReactNode, useState } from "react";
import { Control } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import z from "zod";

import { novelContentsInputFormSchema } from "./novelContentsFormUtil";
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
  contentNode: ReactNode;
  style?: string;
};

export const NovelContentsAccordionComponent: FC<Props> = ({
  contentNode,
  style,
}) => {
  const [accordionValue, setAccordionValue] = useState<string>("");

  return (
    <Accordion
      type="single"
      collapsible
      value={accordionValue}
      onValueChange={setAccordionValue}
    >
      <AccordionItem value="contentsText">
        <AccordionTrigger className={`${style ?? ""} cursor-pointer`}>
          執筆内容
        </AccordionTrigger>
        <AccordionContent>{contentNode}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
