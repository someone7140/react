import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import AuthTwitterRedirectForLoginComponent from "../../components/auth/redirect/AuthTwitterRedirectForLoginComponent";

export default function TwitterRedirectForLogin() {
  const { query, isReady } = useRouter();
  const [codeVerifierState, setCodeVerifierState] = useState(undefined);
  const [authCodeState, setAuthCodeState] = useState(undefined);

  useEffect(() => {
    if (isReady) {
      const codeVerifier = sessionStorage.getItem("codeVerifier");
      const { code } = query;
      // sessionStorageは削除する
      sessionStorage.removeItem("codeVerifier");
      if (codeVerifier && code) {
        setCodeVerifierState(codeVerifier);
        setAuthCodeState(code);
      } else {
        // 値が取れなかったらトップに遷移
        Router.push("/");
      }
    }
  }, [isReady]);

  return (
    <>
      {codeVerifierState && authCodeState && (
        <AuthTwitterRedirectForLoginComponent
          authCode={authCodeState}
          codeVerifier={codeVerifierState}
        />
      )}
    </>
  );
}
