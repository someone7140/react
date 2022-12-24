import { useEffect, useRef } from "react";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";

import { useSharedState } from "../../../services/state/StateService";
import { useMutateApi } from "../../../services/api/ApiHooksService";
import { registerAuthByTwitter } from "../../../services/api/auth/ApiAuthService";
import LoadingComponent from "../../common/LoadingComponent";

export default function AuthTwitterRedirectForRegisterComponent(prop) {
  const { execPostApi } = useMutateApi();
  const executeFlag = useRef(false);
  const { isReady } = useRouter();
  const { setSharedState: setRegisterAuthSharedState } = useSharedState(
    "registerAuthSharedState",
    undefined
  );

  useEffect(() => {
    if (isReady && !executeFlag.current) {
      executeFlag.current = true;
      (async () => {
        const result = await execPostApi({
          apiPath: "userAccount/registerByTwitterAuthCode",
          execPost: function () {
            return registerAuthByTwitter(prop.authCode, prop.codeVerifier);
          },
        });
        if (result?.status == 200) {
          setRegisterAuthSharedState(result.data);
          Router.push("/account/account_register");
        } else if (result?.status == 400) {
          toast.error("すでに登録済みのTwitterアカウントです", {
            duration: 3000,
          });
        } else {
          toast.error("会員登録時にエラーが発生しました", {
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
