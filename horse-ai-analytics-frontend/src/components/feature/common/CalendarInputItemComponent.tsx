"use client";

import React, { FC } from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { requiredMark } from "@/styles/FormStyle";

type Props = {
  title: string;
  onChange: (...event: any[]) => void;
  value?: Date;
  placeholder?: string;
  required?: boolean;
};

export const CalendarInputItemComponent: FC<Props> = ({
  title,
  onChange,
  placeholder,
  value,
  required,
}) => {
  return (
    <FormItem>
      <div>
        <FormLabel className={required ? requiredMark() : undefined}>
          {title}
        </FormLabel>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              {value ? format(value, "yyyy/MM/dd") : <span>{placeholder}</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};
