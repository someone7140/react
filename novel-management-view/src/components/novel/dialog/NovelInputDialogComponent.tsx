"use client";

import { FC } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { NovelResponse } from "@/graphql/gen/graphql";
import { formLabelStyle, submitButtonStyle } from "@/style/FormStyle";
import { dialogStyle, novelTextareaStyle } from "@/style/NovelStyle";

export const novelInputFormSchema = z.object({
  title: z.string().min(1, {
    message: "タイトルは必須です",
  }),
  description: z.string(),
});

export type NovelInputFormType = z.infer<typeof novelInputFormSchema>;

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (input: NovelInputFormType) => void;
  registeredNovel?: NovelResponse;
  disabledFlag?: boolean;
};

export const NovelInputDialogComponent: FC<Props> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  registeredNovel,
  disabledFlag,
}) => {
  const form = useForm<z.infer<typeof novelInputFormSchema>>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(novelInputFormSchema),
    defaultValues: {
      title: registeredNovel?.title ?? "",
      description: registeredNovel?.description ?? "",
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={dialogStyle()}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <DialogHeader>
              <DialogTitle>
                {registeredNovel
                  ? `${registeredNovel.title}を編集`
                  : `新規追加`}
              </DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelStyle({ type: "required" })}>
                    タイトル
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
              name="description"
              render={({ field }) => (
                <FormItem>
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
            <DialogFooter>
              <Button
                type="submit"
                className={submitButtonStyle()}
                disabled={disabledFlag}
              >
                {registeredNovel ? "更新する" : "登録する"}
              </Button>
              <DialogClose asChild>
                <Button variant="outline">閉じる</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
