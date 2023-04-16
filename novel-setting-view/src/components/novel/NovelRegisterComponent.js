import { useRef, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "hooks/store/useAuthStore";
import { createNovel, updateNovelTitle } from "services/api/ApiNovelService";

export default function NovelRegisterComponent(prop) {
  const authStore = useAuthStore();
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");
  const toast = useRef(null);

  const { mutate, isLoading, isError } = useMutation(async () => {
    if (prop.novel) {
      await updateNovelTitle(authStore.userAccount.token, prop.novel.id, title);
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "タイトルを変更しました",
        life: 3000,
      });
    } else {
      await createNovel(authStore.userAccount.token, title);
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "小説を登録しました",
        life: 3000,
      });
    }

    prop.setListUpdateTime(Date.now());
    setShowDialog(false);
  });

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={prop.novel ? "タイトル変更" : "小説登録"}
        visible={showDialog}
        closable={!isLoading}
        onHide={() => setShowDialog(false)}
      >
        <div style={{ width: 350 }}>
          <InputText
            type="text"
            placeholder="小説名を入力"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            style={{ width: 300 }}
          />
          <div style={{ marginTop: 20, textAlign: "right" }}>
            <Button
              rounded
              onClick={() => {
                mutate();
              }}
              disabled={!title}
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
      {!prop.novel && (
        <Button
          rounded
          onClick={() => {
            setTitle("");
            setShowDialog(true);
          }}
        >
          小説登録
        </Button>
      )}
      {prop.novel && (
        <Button
          severity="warning"
          onClick={() => {
            setTitle(prop.novel.title);
            setShowDialog(true);
          }}
        >
          タイトル変更
        </Button>
      )}
    </>
  );
}
