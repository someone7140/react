import { useEffect, useRef } from "react";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";

import { useSharedState } from "../../../services/state/StateService";
import { useMutateApi } from "../../../services/api/ApiHooksService";
import { loginAuthByTwitter } from "../../../services/api/auth/ApiAuthService";
import { setAuthTokenToLocalStorage } from "../../../services/localStorage/AccountAuthService";
import LoadingComponent from "../../common/LoadingComponent";

export default function AuthTwitterRedirectForLoginComponent(prop) {
  const { execPostApi } = useMutateApi();
  const executeFlag = useRef(false);
  const { isReady } = useRouter();
  const { setSharedState: setLoginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  useEffect(() => {
    if (isReady && !executeFlag.current) {
      executeFlag.current = true;
      (async () => {
        const result = await execPostApi({
          apiPath: "login/loginByTwitterAuthCode",
          execPost: function () {
            return loginAuthByTwitter(prop.authCode, prop.codeVerifier);
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
      })();
    }
  }, [isReady]);

  return (
    <div className="w-screen flex justify-center items-center">
      <div className="w-8 h-8">
        <LoadingComponent />
      </div>
    </div>
  );
}
