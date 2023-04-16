import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useMutation } from "@tanstack/react-query";

import { useAuthTokenStorage } from "hooks/localStorage/useAuthTokenStorage";
import { useAuthStore } from "hooks/store/useAuthStore";
import GoogleAuthComponent from "components/auth/method/GoogleAuthComponent";
import { registerAuthByGoogleAuthCode } from "services/api/ApiAuthService";

export default function UserAccountRegisterComponent() {
  const router = useRouter();
  const authStore = useAuthStore();
  const { updateAuthToken } = useAuthTokenStorage();
  const [googleAuthCode, setGoogleAuthCode] = useState(undefined);
  const toast = useRef(null);

  const { mutate: googleAuthMutate, isLoading: googleAuthLoading } =
    useMutation(async (authCode) => {
      const result = await registerAuthByGoogleAuthCode(authCode);
      authStore.setUserAccount(result);
      updateAuthToken(result.token);
    });

  useEffect(() => {
    if (googleAuthCode?.code) {
      googleAuthMutate(googleAuthCode.code, {
        onError: async (error) => {
          let detail = "";
          if (error?.response?.status === 405) {
            detail = "会員が既に登録済みです";
          } else {
            detail = "会員登録時にエラーが発生しました";
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
            detail: "会員登録しました",
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
