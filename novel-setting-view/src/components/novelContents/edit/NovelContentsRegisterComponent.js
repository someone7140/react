import { useEffect, useRef } from "react";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "hooks/store/useAuthStore";
import { updateNovelContents } from "services/api/ApiNovelContentsService";

export default function NovelContentsRegisterComponent(prop) {
  const authStore = useAuthStore();
  const toast = useRef(null);

  const { mutate, isLoading, isError } = useMutation(async () => {
    await updateNovelContents(
      authStore.userAccount.token,
      prop.contentId,
      prop.editor.children,
      prop.headlines
    );
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: "内容を保存しました",
      life: 3000,
    });
  });

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "内容の保存時にエラーが発生しました",
        life: 3000,
      });
    }
  }, [isError]);

  return (
    <>
      <Toast ref={toast} />
      <Button
        severity="success"
        onClick={() => {
          mutate();
        }}
        style={{
          marginLeft: 15,
        }}
        disabled={isLoading}
      >
        内容保存
      </Button>
    </>
  );
}
