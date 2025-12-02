"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import z from "zod";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  NovelContentsInputFormType,
  novellContentsInputFormSchema,
} from "../form/novelContentsFormUtil";
import { NovelContentsTextareaComponent } from "../form/NovelContentsTextareaComponent";

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
import {
  NovelContentsResponse,
  RegisterNovelContentsDocument,
} from "@/graphql/gen/graphql";
import { formLabelStyle, submitButtonStyle } from "@/style/FormStyle";
import { dialogStyle, novelTextareaStyle } from "@/style/NovelStyle";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  novelId: string;
  refetch: () => void;
  registeredContents?: NovelContentsResponse;
};

export const ParentNovelContentsRegisterDialogComponent: FC<Props> = ({
  isOpen,
  setIsOpen,
  novelId,
  refetch,
  registeredContents,
}) => {
  const [registerNovelContents, { loading: registerNovelContentsLoading }] =
    useMutation(RegisterNovelContentsDocument);

  const form = useForm<z.infer<typeof novellContentsInputFormSchema>>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(novellContentsInputFormSchema),
    defaultValues: {
      chapterName: registeredContents?.chapterName ?? "",
      displayOrder:
        registeredContents?.displayOrder != null
          ? String(registeredContents.displayOrder)
          : "",
      description: registeredContents?.description ?? "",
      contents: registeredContents?.contents ?? "",
    },
  });

  const onSubmit = async (input: NovelContentsInputFormType) => {
    const result = await registerNovelContents({
      variables: {
        inputs: {
          id: registeredContents?.id ?? null,
          chapterName: input.chapterName,
          novelId: novelId,
          displayOrder: input.displayOrder
            ? parseInt(input.displayOrder)
            : null,
          description: input.description,
          contents: input.contents,
        },
      },
    });
    if (result.error) {
      toast.error("登録時にエラーが発生しました");
    } else {
      refetch();
      setIsOpen(false);
      toast.info("執筆内容を登録しました");
    }
  };

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
                {registeredContents ? "編集" : "新規追加"}
              </DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="chapterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelStyle({ type: "required" })}>
                    見出し名
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
            <NovelContentsTextareaComponent control={form.control} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">閉じる</Button>
              </DialogClose>
              <Button
                type="submit"
                className={submitButtonStyle()}
                disabled={registerNovelContentsLoading}
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
