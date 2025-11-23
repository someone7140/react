"use client";

import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify-icon/react";

import {
  novelSettingInputFormSchema,
  NovelSettingInputFormType,
} from "../form/novelSettingFormUtil";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Textarea } from "@/components/ui/textarea";
import {
  NovelSettingResponse,
  RegisterNovelSettingsDocument,
} from "@/graphql/gen/graphql";
import { formLabelStyle, submitButtonStyle } from "@/style/FormStyle";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  novelId: string;
  refetch: () => void;
  registeredSetting?: NovelSettingResponse;
};

export const ParentNovelSettingRegisterDialogComponent: FC<Props> = ({
  isOpen,
  setIsOpen,
  novelId,
  refetch,
  registeredSetting,
}) => {
  const [registerNovelSettings, { loading: registerNovelSettingsLoading }] =
    useMutation(RegisterNovelSettingsDocument);

  const form = useForm<z.infer<typeof novelSettingInputFormSchema>>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(novelSettingInputFormSchema),
    defaultValues: {
      name: registeredSetting?.name ?? "",
      displayOrder:
        registeredSetting?.displayOrder != null
          ? String(registeredSetting.displayOrder)
          : "",
      description: registeredSetting?.description ?? "",
      attributes: registeredSetting?.attributes.map((a) => {
        return { value: a };
      }),
    },
  });
  const {
    fields: attributeFields,
    append: attributeAppend,
    remove: attributeRemove,
  } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  const onSubmit = async (input: NovelSettingInputFormType) => {
    const result = await registerNovelSettings({
      variables: {
        inputs: {
          id: registeredSetting?.id ?? null,
          name: input.name,
          novelId: novelId,
          displayOrder: input.displayOrder
            ? parseInt(input.displayOrder)
            : null,
          description: input.description,
          attributes: input.attributes.filter((a) => !!a).map((a) => a.value),
        },
      },
    });
    if (result.error) {
      toast.error("登録時にエラーが発生しました");
    } else {
      refetch();
      setIsOpen(false);
      toast.info("設定を登録しました");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <DialogHeader>
              <DialogTitle>
                {registeredSetting ? "編集" : "新規追加"}
              </DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelStyle({ type: "required" })}>
                    設定名
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-[95%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelStyle()}>表示順</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-[95%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    control={form.control}
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelStyle()}>詳細</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="w-[95%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">閉じる</Button>
              </DialogClose>
              <Button
                type="submit"
                className={submitButtonStyle()}
                disabled={registerNovelSettingsLoading}
              >
                登録する
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
