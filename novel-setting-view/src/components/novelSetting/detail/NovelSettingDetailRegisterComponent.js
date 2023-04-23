import { useRef } from "react";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { useMutation } from "@tanstack/react-query";

export default function NovelSettingDetailRegisterComponent(prop) {
  const toast = useRef(null);

  const { mutate, isLoading } = useMutation(async () => {}, {
    onSuccess: (response) => {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "保存しました",
        life: 3000,
      });
    },
    onError: (error) => {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "保存時にエラーが発生しました",
        life: 3000,
      });
    },
  });

  return (
    <>
      <Toast ref={toast} />
      <Button
        onClick={() => {
          mutate();
        }}
        loading={isLoading}
      >
        保存
      </Button>
    </>
  );
}
