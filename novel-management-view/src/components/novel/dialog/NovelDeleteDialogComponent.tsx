"use client";

import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NovelResponse } from "@/graphql/gen/graphql";
import { submitButtonStyle } from "@/style/FormStyle";
import { dialogStyle } from "@/style/NovelStyle";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: () => void;
  registeredNovel: NovelResponse;
  disabledFlag?: boolean;
};

export const NovelDeleteDialogComponent: FC<Props> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  registeredNovel,
  disabledFlag,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={dialogStyle()}>
        <div className="flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>{`${registeredNovel.title}の削除`}</DialogTitle>
          </DialogHeader>
          <div>削除します、よろしいですか？</div>
          <DialogFooter>
            <Button
              type="submit"
              className={submitButtonStyle()}
              disabled={disabledFlag}
              onClick={onSubmit}
            >
              削除する
            </Button>
            <DialogClose asChild>
              <Button variant="outline">閉じる</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
