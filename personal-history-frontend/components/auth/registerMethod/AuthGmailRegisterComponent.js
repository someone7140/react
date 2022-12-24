import React from "react";
import GoogleLogin from "react-google-login";
import toast from "react-hot-toast";

import LoadingComponent from "../../common/LoadingComponent";
import { useMutateApi } from "../../../services/api/ApiHooksService";
import { registerAuthByGoogleAuthCode } from "../../../services/api/auth/ApiAuthService";
import { useSharedState } from "../../../services/state/StateService";

export default function AuthGmailRegisterComponent() {
  const { execPostApi, isLoading } = useMutateApi();
  const { setSharedState: setRegisterAuthSharedState } = useSharedState(
    "registerAuthSharedState",
    undefined
  );

  async function onSuccessGoogleLogin(response) {
    const result = await execPostApi({
      apiPath: "userAccount/registerByGoogleAuthCode",
      execPost: function () {
        return registerAuthByGoogleAuthCode(response.code);
      },
    });
    if (result?.status == 200) {
      setRegisterAuthSharedState(result.data);
    } else if (result?.status == 400) {
      toast.error("すでに登録済みのGoogleアカウントです", {
        duration: 3000,
      });
    } else {
      toast.error("会員登録時にエラーが発生しました", {
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
          buttonText="Googleアカウントで会員登録"
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
