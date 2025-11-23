"use client";

import React, { FC, useEffect, useImperativeHandle, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useMutation } from "@apollo/client/react";
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
import {
  DeleteNovelSettingsByIdsDocument,
  NovelSettingRegisterInput,
  NovelSettingResponse,
  RegisterNovelSettingsDocument,
} from "@/graphql/gen/graphql";
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
  isChildrenRegisterDisabled: () => void;
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
  const [registerNovelSettings, { loading: registerNovelSettingsLoading }] =
    useMutation(RegisterNovelSettingsDocument);
  const [
    deleteNovelSettingsByIds,
    { loading: deleteNovelSettingsByIdsLoading },
  ] = useMutation(DeleteNovelSettingsByIdsDocument);

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
    const inputs = formData.settings.map((s) => {
      return {
        id: s.id,
        name: s.name,
        novelId: parentNovelSetting.novelId,
        parentSettingId: parentNovelSetting.id,
        displayOrder: s.displayOrder ? parseInt(s.displayOrder) : null,
        attributes: s.attributes.map((a) => a.value),
        description: s.description,
      } as NovelSettingRegisterInput;
    });
    const registerResult = await registerNovelSettings({
      variables: {
        inputs: inputs,
      },
    });
    let isSuccess = !registerResult.error;

    if (deleteSettingIds.length > 0) {
      const deleteResult = await deleteNovelSettingsByIds({
        variables: { ids: deleteSettingIds },
      });
      isSuccess = !deleteResult.error;
    }

    if (isSuccess) {
      toast.info("更新しました");
    } else {
      toast.error("登録時にエラーが発生しました");
      return;
    }
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
    isChildrenRegisterDisabled: () => {
      return registerNovelSettingsLoading || deleteNovelSettingsByIdsLoading;
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
