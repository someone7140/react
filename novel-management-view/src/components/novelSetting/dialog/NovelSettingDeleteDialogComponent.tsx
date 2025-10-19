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
import { NovelSettingResponse } from "@/graphql/gen/graphql";
import { submitButtonStyle } from "@/style/FormStyle";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: () => void;
  registeredSetting: NovelSettingResponse;
  disabledFlag?: boolean;
};

export const NovelSettingDeleteDialogComponent: FC<Props> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  registeredSetting,
  disabledFlag,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <div className="flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>{`${registeredSetting.name}の削除`}</DialogTitle>
          </DialogHeader>
          <div>削除します。よろしいですか？</div>
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
