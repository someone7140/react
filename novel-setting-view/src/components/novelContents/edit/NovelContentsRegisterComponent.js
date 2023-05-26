import { useRef } from "react";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "hooks/store/useAuthStore";

export default function NovelContentsRegisterComponent(prop) {
  const authStore = useAuthStore();
  const toast = useRef(null);

  const { mutate, isLoading, isError } = useMutation(async () => {});

  const onClick = () => {};
  return (
    <>
      <Toast ref={toast} />
      <Button
        onClick={onClick}
        style={{
          marginLeft: 15,
        }}
      >
        内容保存
      </Button>
    </>
  );
}
