"use client";

import React, { FC, useState } from "react";

import { RaceInfoListFilterInputObject } from "@/query/graphqlGen/graphql";

import { buttonStyle } from "@/styles/CommonStyle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  filter?: RaceInfoListFilterInputObject;
  setFilter: React.Dispatch<
    React.SetStateAction<RaceInfoListFilterInputObject | undefined>
  >;
};

export const SearchRaceInfoDialogComponent: FC<Props> = ({
  filter,
  setFilter,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-row items-center gap-4">
        <DialogTrigger asChild>
          <Button className={buttonStyle({ color: "cyan" })}>
            検索条件の設定
          </Button>
        </DialogTrigger>
        {filter && (
          <Button className={buttonStyle({ color: "gray" })}>
            検索条件のクリア
          </Button>
        )}
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>検索条件</DialogTitle>
        <DialogFooter className="flex flex-row items-center gap-8">
          <Button type="button" className={buttonStyle({ color: "indigo" })}>
            設定
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
