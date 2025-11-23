"use client";

import { FC } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Icon } from "@iconify-icon/react";

import { NovelSettingChildrenInputFormType } from "./NovelSettingChildrenComponent";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formLabelStyle } from "@/style/FormStyle";

type Props = {
  control: Control<NovelSettingChildrenInputFormType>;
  index: number;
};

export const NovelSettingChildComponent: FC<Props> = ({ control, index }) => {
  const {
    fields: attributeFields,
    append: attributeAppend,
    remove: attributeRemove,
  } = useFieldArray({
    control: control,
    name: `settings.${index}.attributes`,
  });

  return (
    <div className="flex flex-col gap-3 items-center w-[100%]">
      <FormField
        control={control}
        name={`settings.${index}.name`}
        render={({ field }) => (
          <FormItem className="w-[95%]">
            <FormLabel className={formLabelStyle({ type: "required" })}>
              設定名
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
        name={`settings.${index}.displayOrder`}
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
      <FormItem className="w-[95%]">
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
        {attributeFields.map((_, attributeIndex) => (
          <div key={attributeIndex} className="flex gap-3 mb-1">
            <FormField
              control={control}
              name={`settings.${index}.attributes.${attributeIndex}.value`}
              render={({ field }) => (
                <FormControl>
                  <Input {...field} className="w-[95%]" />
                </FormControl>
              )}
            />
            <div
              className="cursor-pointer flex items-center"
              onClick={() => {
                attributeRemove(attributeIndex);
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
      <FormField
        control={control}
        name={`settings.${index}.description`}
        render={({ field }) => (
          <FormItem className="w-[95%]">
            <FormLabel className={formLabelStyle()}>詳細</FormLabel>
            <FormControl>
              <Textarea {...field} className="w-[95%]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
