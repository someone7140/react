"use client";

import React, { FC, useEffect, useImperativeHandle, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  convertContentsInputFromResponse,
  novelContentsInputFormSchema,
} from "../form/novelContentsFormUtil";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  DeleteNovelContentsByIdsDocument,
  NovelContentsResponse,
  RegisterNovelContentsDocument,
} from "@/graphql/gen/graphql";
import { deleteButtonStyle } from "@/style/FormStyle";
import { NovelContentsChildComponent } from "./NovelContentsChildComponent";

export const novelContentsChildrenInputFormSchema = z.object({
  contentsList: z.array(novelContentsInputFormSchema),
});

export type NovelContentsChildrenInputFormType = z.infer<
  typeof novelContentsChildrenInputFormSchema
>;

// 公開したい機能の型定義
export interface ChildrenHandle {
  addChild: () => void;
  onSubmit: () => void;
  isChildrenRegisterDisabled: () => void;
}

type Props = {
  parentNovelContents: NovelContentsResponse;
  novelContents: NovelContentsResponse[];
  setIsHasChildren: (isHasChildren: boolean) => void;
  handleRef?: React.Ref<ChildrenHandle>;
};

export const NovelContentsChildrenComponent: FC<Props> = ({
  parentNovelContents,
  novelContents,
  setIsHasChildren,
  handleRef,
}) => {
  const [deleteContents, setDeleteSettingIds] = useState<string[]>([]);
  const [accordionValue, setAccordionValue] = useState<string>("");
  const [registerNovelContents, { loading: registerNovelContentsLoading }] =
    useMutation(RegisterNovelContentsDocument);
  const [
    deleteNovelContentsByIds,
    { loading: deleteNovelContentsByIdsLoading },
  ] = useMutation(DeleteNovelContentsByIdsDocument);

  const form = useForm<z.infer<typeof novelContentsChildrenInputFormSchema>>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(novelContentsChildrenInputFormSchema),
    defaultValues: { contentsList: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contentsList",
  });

  useEffect(() => {
    const childrenContentsList = novelContents
      .filter((c) => c.parentContentsId === parentNovelContents.id)
      .map(convertContentsInputFromResponse);
    form.setValue("contentsList", childrenContentsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [novelContents, parentNovelContents.id]);

  useEffect(() => {
    setIsHasChildren(form.watch("contentsList").length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("contentsList").length]);

  const addChild = () => {
    append({
      chapterName: "",
      description: "",
      contents: "",
      displayOrder: "",
    });
    setAccordionValue("contentsChildren");
  };

  const onSubmit = async (formData: NovelContentsChildrenInputFormType) => {
    const inputs = formData.contentsList.map((c) => {
      return {
        id: c.id,
        chapterName: c.chapterName,
        novelId: parentNovelContents.novelId,
        parentContentsId: parentNovelContents.id,
        displayOrder: c.displayOrder ? parseInt(c.displayOrder) : null,
        contents: c.contents,
        description: c.description,
      } as NovelContentsResponse;
    });
    const registerResult = await registerNovelContents({
      variables: {
        inputs: inputs,
      },
    });
    let isSuccess = !registerResult.error;

    if (deleteContents.length > 0) {
      const deleteResult = await deleteNovelContentsByIds({
        variables: { ids: deleteContents },
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
    const deleteTarget = form.getValues("contentsList")[index];
    if (deleteTarget.id) {
      setDeleteSettingIds([...deleteContents, deleteTarget.id]);
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
      return registerNovelContentsLoading || deleteNovelContentsByIdsLoading;
    },
  }));

  return (
    <Accordion
      type="single"
      collapsible
      value={accordionValue}
      onValueChange={setAccordionValue}
    >
      {form.watch("contentsList").length > 0 && (
        <AccordionItem value="contentsChildren">
          <AccordionTrigger className="cursor-pointer">
            子見出しの一覧
          </AccordionTrigger>
          <AccordionContent>
            <Form {...form}>
              <div className="space-y-4">
                {fields.map((_, index) => (
                  <div key={index}>
                    <NovelContentsChildComponent
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
