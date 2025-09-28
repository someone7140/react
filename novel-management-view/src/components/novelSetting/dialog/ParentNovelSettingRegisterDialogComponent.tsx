"use client";

import { FC } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";
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
import { Textarea } from "@/components/ui/textarea";
import { RegisterNovelSettingsDocument } from "@/graphql/gen/graphql";
import { formLabelStyle, submitButtonStyle } from "@/style/FormStyle";

export const parentSettingInputFormSchema = z.object({
  name: z.string().min(1, {
    message: "タイトルは必須です",
  }),
  displayOrder: z.string().refine((val) => {
    if (val === "") return true;
    const num = Number(val);
    return !isNaN(num) && Number.isInteger(num);
  }, "数値を入力してください"),
  description: z.string(),
});

export type ParentSettingInputFormType = z.infer<
  typeof parentSettingInputFormSchema
>;

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  novelId: string;
  refetch: () => void;
};

export const ParentNovelSettingRegisterDialogComponent: FC<Props> = ({
  isOpen,
  setIsOpen,
  novelId,
  refetch,
}) => {
  const [registerNovelSettings, { loading: registerNovelSettingsLoading }] =
    useMutation(RegisterNovelSettingsDocument);
  const form = useForm<z.infer<typeof parentSettingInputFormSchema>>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(parentSettingInputFormSchema),
    defaultValues: {
      name: "",
      displayOrder: "",
      description: "",
    },
  });

  const onSubmit = async (input: ParentSettingInputFormType) => {
    const result = await registerNovelSettings({
      variables: {
        inputs: {
          name: input.name,
          novelId: novelId,
          displayOrder: input.displayOrder
            ? parseInt(input.displayOrder)
            : null,
          description: input.description,
          attributes: [],
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
              <DialogTitle>新規追加</DialogTitle>
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={formLabelStyle()}>概要</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="w-[95%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                className={submitButtonStyle()}
                disabled={registerNovelSettingsLoading}
              >
                登録する
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
