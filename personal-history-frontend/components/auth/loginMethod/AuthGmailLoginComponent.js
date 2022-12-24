import React from "react";
import Router from "next/router";
import GoogleLogin from "react-google-login";
import toast from "react-hot-toast";

import LoadingComponent from "../../common/LoadingComponent";
import { useMutateApi } from "../../../services/api/ApiHooksService";
import { loginByGoogleAuthCode } from "../../../services/api/auth/ApiAuthService";
import { setAuthTokenToLocalStorage } from "../../../services/localStorage/AccountAuthService";
import { useSharedState } from "../../../services/state/StateService";

export default function AuthGmailLoginComponent() {
  const { execPostApi, isLoading } = useMutateApi();
  const { setSharedState: setLoginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  async function onSuccessGoogleLogin(response) {
    const result = await execPostApi({
      apiPath: "login/loginByGoogleAuthCode",
      execPost: function () {
        return loginByGoogleAuthCode(response.code);
      },
    });
    if (result?.status == 200) {
      setAuthTokenToLocalStorage(result.data.token);
      setLoginAuthSharedState(result.data);
      toast.success("ログインしました", {
        duration: 3000,
      });
      Router.push("/");
    } else if (result?.status == 404) {
      toast.error("会員登録がされていないアカウントです", {
        duration: 3000,
      });
    } else {
      toast.error("ログイン時にエラーが発生しました", {
        duration: 3000,
      });
    }
  }

  function onErrorGoogleLogin() {
    toast.error("Googleアカウントの認証ができませんでした", {
      duration: 3000,
    });
  }

  return (
    <div className="w-64 flex justify-center  items-center flex-col">
      {!isLoading && (
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          buttonText="Googleアカウントでログイン"
          responseType="code"
          onSuccess={onSuccessGoogleLogin}
          onFailure={onErrorGoogleLogin}
          accessType="offline"
          scope="email profile openid"
        />
      )}
      {isLoading && (
        <div className="w-8 h-8">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
}
