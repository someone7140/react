"use client";

import React, { FC, useEffect, useImperativeHandle, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { NovelSettingChildComponent } from "./NovelSettingChildComponent";
import {
  convertSettingInputFromResponse,
  novelSettingInputFormSchema,
} from "../form/novelSettingFormUtil";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { NovelSettingResponse } from "@/graphql/gen/graphql";
import { deleteButtonStyle } from "@/style/FormStyle";

export const novelSettingChildrenInputFormSchema = z.object({
  settings: z.array(novelSettingInputFormSchema),
});

export type NovelSettingChildrenInputFormType = z.infer<
  typeof novelSettingChildrenInputFormSchema
>;

// 公開したい機能の型定義
export interface ChildrenHandle {
  addChild: () => void;
  onSubmit: () => void;
}

type Props = {
  parentNovelSetting: NovelSettingResponse;
  novelSettings: NovelSettingResponse[];
  setIsHasChildren: (isHasChildren: boolean) => void;
  handleRef?: React.Ref<ChildrenHandle>;
};

export const NovelSettingChildrenComponent: FC<Props> = ({
  parentNovelSetting,
  novelSettings,
  setIsHasChildren,
  handleRef,
}) => {
  const [deleteSettingIds, setDeleteSettingIds] = useState<string[]>([]);
  const [accordionValue, setAccordionValue] = useState<string>("");

  const form = useForm<z.infer<typeof novelSettingChildrenInputFormSchema>>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(novelSettingChildrenInputFormSchema),
    defaultValues: { settings: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "settings",
  });

  useEffect(() => {
    const childrenSettings = novelSettings
      .filter((s) => s.parentSettingId === parentNovelSetting.id)
      .map(convertSettingInputFromResponse);
    form.setValue("settings", childrenSettings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [novelSettings, parentNovelSetting.id]);

  useEffect(() => {
    setIsHasChildren(form.watch("settings").length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("settings").length]);

  const addChild = () => {
    append({
      name: "",
      description: "",
      displayOrder: "",
      attributes: [],
    });
    setAccordionValue("settingChildren");
  };

  const onSubmit = async (formData: NovelSettingChildrenInputFormType) => {
    formData.settings.forEach((s) => {
      console.log(s);
    });
    console.log(deleteSettingIds);
  };

  const onRemove = (index: number) => {
    const deleteTarget = form.getValues("settings")[index];
    if (deleteTarget.id) {
      setDeleteSettingIds([...deleteSettingIds, deleteTarget.id]);
    }

    remove(index);
  };

  useImperativeHandle(handleRef, () => ({
    addChild: () => {
      addChild();
    },
    onSubmit: async () => {
      await form.handleSubmit(onSubmit)();
    },
  }));

  return (
    <Accordion
      type="single"
      collapsible
      value={accordionValue}
      onValueChange={setAccordionValue}
    >
      {form.watch("settings").length > 0 && (
        <AccordionItem value="settingChildren">
          <AccordionTrigger className="cursor-pointer">
            子設定の一覧
          </AccordionTrigger>
          <AccordionContent>
            <Form {...form}>
              <div className="space-y-4">
                {fields.map((_, index) => (
                  <div key={index}>
                    <NovelSettingChildComponent
                      control={form.control}
                      index={index}
                    />
                    <div className="flex justify-center mt-5">
                      <Button
                        className={deleteButtonStyle()}
                        onClick={() => {
                          onRemove(index);
                        }}
                      >
                        削除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Form>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
};
