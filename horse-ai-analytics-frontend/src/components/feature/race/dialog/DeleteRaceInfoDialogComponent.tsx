"use client";

import React, { FC, useState } from "react";

import { ApolloQueryResult } from "@apollo/client";

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
import { useDeleteRaceInfoMutation } from "@/query/graphqlGen/graphql";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";

type Props = {
  raceId: string;
  raceName: string;
  afterDeleteExec: () => void;
};

export const DeleteRaceInfoDialogComponent: FC<Props> = ({
  raceId,
  raceName,
  afterDeleteExec,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteRaceInfoMutation, { loading: loadingDeleteRaceInfo }] =
    useDeleteRaceInfoMutation();

  const executeDelete = async () => {
    const result = await deleteRaceInfoMutation({
      variables: { raceInfoId: raceId },
    });

    if (result.data?.deleteRaceInfo) {
      afterDeleteExec();
      setOpen(false);
    } else {
      toast({
        className: `${toastStyle({ textColor: "amber" })}`,
        variant: "destructive",
        description: "レース情報の削除に失敗しました。",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonStyle({ color: "gray" })}>削除</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>「{raceName}」を削除します</DialogTitle>
        <DialogFooter className="flex flex-row items-center gap-8">
          <Button
            type="button"
            className={buttonStyle({ color: "indigo" })}
            disabled={loadingDeleteRaceInfo}
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
