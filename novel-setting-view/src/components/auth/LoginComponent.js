import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useMutation } from "@tanstack/react-query";

import { useAuthTokenStorage } from "hooks/localStorage/useAuthTokenStorage";
import { useAuthStore } from "hooks/store/useAuthStore";
import GoogleAuthComponent from "components/auth/method/GoogleAuthComponent";
import { loginByGoogleAuthCode } from "services/api/ApiAuthService";

export default function LoginComponent() {
  const router = useRouter();
  const authStore = useAuthStore();
  const { updateAuthToken } = useAuthTokenStorage();
  const [googleAuthCode, setGoogleAuthCode] = useState(undefined);
  const toast = useRef(null);
  const { mutate: googleAuthMutate, isLoading: googleAuthLoading } =
    useMutation(async (authCode) => {
      const result = await loginByGoogleAuthCode(authCode);
      authStore.setUserAccount(result);
      updateAuthToken(result.token);
    });

  useEffect(() => {
    if (googleAuthCode?.code) {
      googleAuthMutate(googleAuthCode.code, {
        onError: async (error) => {
          let detail = "";
          if (error?.response?.status === 401) {
            detail = "会員未登録のアカウントです";
          } else {
            detail = "ログイン時にエラーが発生しました";
          }
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: detail,
            life: 3000,
          });
        },
        onSuccess: async () => {
          toast.current.show({
            severity: "info",
            summary: "Info",
            detail: "ログインしました",
            life: 3000,
          });
          router.push("/");
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleAuthCode]);

  return (
    <>
      <Toast ref={toast} />
      <GoogleAuthComponent
        setGoogleAuthCode={setGoogleAuthCode}
        isLoading={googleAuthLoading}
      />
    </>
  );
}
