import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "hooks/store/useAuthStore";
import {
  createNovelSetting,
  updateNovelSettingName,
} from "services/api/ApiNovelSettingService";

export default function NovelSettingRecordRegisterComponent(prop) {
  const authStore = useAuthStore();
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState("");
  const [nextOrder, setNextOrder] = useState(1);
  const toast = useRef(null);

  const { mutate, isLoading, isError } = useMutation(async () => {
    if (prop.setting) {
      await updateNovelSettingName(
        authStore.userAccount.token,
        prop.setting.id,
        name
      );
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "設定名称を更新しました",
        life: 3000,
      });
    } else {
      await createNovelSetting(
        authStore.userAccount.token,
        prop.novelId,
        name,
        nextOrder
      );
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "設定を登録しました",
        life: 3000,
      });
    }

    prop.setListUpdateTime(Date.now());
    setShowDialog(false);
  });

  useEffect(() => {
    // maxのorderを取得
    let maxOrder = 0;
    prop.settingList.forEach((setting) => {
      if (setting.order > maxOrder) {
        maxOrder = setting.order;
      }
    });
    setNextOrder(maxOrder + 1);
  }, [prop.settingList]);

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={"設定登録"}
        visible={showDialog}
        closable={!isLoading}
        onHide={() => setShowDialog(false)}
      >
        <div style={{ width: 350 }}>
          <InputText
            type="text"
            placeholder="設定名を入力"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            style={{ width: 300 }}
          />
          <div style={{ marginTop: 20, textAlign: "right" }}>
            <Button
              rounded
              onClick={() => {
                mutate();
              }}
              disabled={!name}
              loading={isLoading}
            >
              登録
            </Button>
          </div>
          {isError && (
            <div style={{ marginTop: 10, color: "red" }}>
              登録時にエラーが発生しました
            </div>
          )}
        </div>
      </Dialog>
      {!prop.setting && (
        <Button
          onClick={() => {
            setName("");
            setShowDialog(true);
          }}
        >
          設定追加
        </Button>
      )}
      {prop.setting && (
        <Button
          rounded
          severity="warning"
          onClick={() => {
            setName(prop.setting.name);
            setShowDialog(true);
          }}
        >
          設定名変更
        </Button>
      )}
    </>
  );
}
