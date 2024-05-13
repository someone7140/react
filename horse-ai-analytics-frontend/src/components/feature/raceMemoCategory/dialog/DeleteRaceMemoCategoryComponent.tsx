"use client";

import React, { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useDeleteMemoCategoryMutation } from "@/query/graphqlGen/graphql";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";

type Props = {
  id: string;
  name: string;
  afterDeleteExec: () => void;
};

export const DeleteRaceMemoCategoryComponent: FC<Props> = ({
  id,
  name,
  afterDeleteExec,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteMemoCategoryMutation, { loading: loadingDeleteMemoCategory }] =
    useDeleteMemoCategoryMutation();

  const executeDelete = async () => {
    const result = await deleteMemoCategoryMutation({
      variables: { id: id },
    });

    if (result.data?.deleteMemoCategory) {
      afterDeleteExec();
      setOpen(false);
    } else {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "カテゴリーの削除に失敗しました。",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonStyle({ color: "gray" })}>削除</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>「{name}」を削除します</DialogTitle>
        <DialogFooter className="flex flex-row items-center gap-8">
          <Button
            type="button"
            className={buttonStyle({ color: "indigo" })}
            disabled={loadingDeleteMemoCategory}
            onClick={executeDelete}
          >
            削除
          </Button>
          <DialogClose asChild>
            <Button type="button" className={buttonStyle({ color: "gray" })}>
              キャンセル
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
