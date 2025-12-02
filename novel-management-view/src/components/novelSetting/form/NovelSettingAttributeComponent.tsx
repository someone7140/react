"use client";

import { FC } from "react";
import { Control, useFieldArray } from "react-hook-form";
import z from "zod";
import { Icon } from "@iconify-icon/react";

import { novelSettingInputFormSchema } from "./novelSettingFormUtil";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formLabelStyle } from "@/style/FormStyle";

type Props = {
  control: Control<z.infer<typeof novelSettingInputFormSchema>>;
};

export const NovelSettingAttributeComponent: FC<Props> = ({ control }) => {
  const {
    fields: attributeFields,
    append: attributeAppend,
    remove: attributeRemove,
  } = useFieldArray({
    control: control,
    name: "attributes",
  });

  return (
    <FormItem>
      <div className="flex gap-3">
        <FormLabel className={formLabelStyle()}>属性</FormLabel>
        <div
          className="cursor-pointer flex items-center"
          onClick={() => {
            attributeAppend({ value: "" });
          }}
        >
          <Icon
            icon="tabler:circle-plus"
            width="24"
            height="24"
            style={{ color: "#2fdcdb" }}
          />
        </div>
      </div>
      {attributeFields.map((_, index) => (
        <div key={index} className="flex gap-3 mb-1">
          <FormField
            control={control}
            name={`attributes.${index}.value`}
            render={({ field }) => (
              <FormControl>
                <Input {...field} className="w-[95%]" />
              </FormControl>
            )}
          />
          <div
            className="cursor-pointer flex items-center"
            onClick={() => {
              attributeRemove(index);
            }}
          >
            <Icon
              icon="ri:close-circle-line"
              width="24"
              height="24"
              style={{ color: "#3970ab" }}
            />
          </div>
        </div>
      ))}
    </FormItem>
  );
};
