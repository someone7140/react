import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "./AuthProvider";
import { loadGoogleScript } from "../../util/GoogleLoginUtil";
import { setAuthTokenLocalStorage } from "../../util/AuthTokenUtil";
import { getUserFromGoogleAuthCodeApi } from "../../grpc/api/AuthenticationUserApi";

export default function LoginComponent() {
  const { authInfo, setAuthInfo } = useContext(AuthContext);

  const [gapi, setGapi] = useState();

  // ログイン
  const onClickLogin = async () => {
    gapi.auth2.authorize(
      {
        apiKey: process.env.GCP_AUTH_API_KEY,
        clientId: process.env.GCP_AUTH_CLIENT_ID,
        response_type: "code",
        scope: "profile email",
        access_type: "offline",
      },
      async function (response) {
        if (response.error) {
          toast("googleログインに失敗しました");
        } else {
          const authCode = response.code;
          const authInfoResponse = await getUserFromGoogleAuthCodeApi(authCode);
          if (authInfoResponse?.success) {
            setAuthInfo(authInfoResponse?.user);
            setAuthTokenLocalStorage(authInfoResponse?.user?.authToken);
          } else {
            toast("googleアカウントの認証に失敗しました");
          }
        }
      }
    );
  };

  useEffect(() => {
    // ライブラリのスクリプトを読み込んだ後処理
    window.onGoogleScriptLoad = () => {
      const _gapi = window.gapi;
      _gapi.load("client:auth2");
      setGapi(_gapi);
    };
    // ここでライブラリのスクリプトを読み込む
    loadGoogleScript();
  });

  return (
    <>
      まずはログインをしてください
      <br />
      <button type="button" onClick={onClickLogin}>
        Googleログイン
      </button>
    </>
  );
}
