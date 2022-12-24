import { useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

import AuthGmailRegisterComponent from "./registerMethod/AuthGmailRegisterComponent";
import AuthTwitterRegisterComponent from "./registerMethod/AuthTwitterRegisterComponent";
import { useSharedState } from "../../services/state/StateService";

export default function AuthForUserAccountRegisterComponent() {
  const { sharedState: registerAuthSharedState } = useSharedState(
    "registerAuthSharedState",
    undefined
  );
  const { sharedState: loginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  useEffect(() => {
    if (loginAuthSharedState) {
      Router.push("/");
    }
    if (registerAuthSharedState) {
      Router.push("/account/account_register");
    }
  }, [registerAuthSharedState, loginAuthSharedState]);

  return (
    <div className="w-screen flex justify-center items-center flex-col">
      <div className="mb-4">
        <AuthGmailRegisterComponent />
      </div>
      <div className="mb-4">
        <AuthTwitterRegisterComponent />
      </div>
      <div>
        <Link href="/auth/email_register">
          <button className="w-64 bg-emerald-100 rounded px-4 py-2 border border-neutral-300">
            メールアドレスで会員登録
          </button>
        </Link>
      </div>
    </div>
  );
}
