import React from "react";
import Link from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import LoadingComponent from "../../common/LoadingComponent";
import EmailInputComponent from "../input/EmailInputComponent";
import PasswordInputComponent from "../input/PasswordInputComponent";
import { useMutateApi } from "../../../services/api/ApiHooksService";
import { loginByEmail } from "../../../services/api/auth/ApiAuthService";
import { setAuthTokenToLocalStorage } from "../../../services/localStorage/AccountAuthService";
import { useSharedState } from "../../../services/state/StateService";

export default function AuthEmailLoginComponent() {
  const { execPostApi, isLoading } = useMutateApi();
  const { setSharedState: setLoginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });

  async function onClickEmailLogin(data) {
    const result = await execPostApi({
      apiPath: "login/loginByEmail",
      execPost: function () {
        return loginByEmail(data.email, data.password);
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
    } else if (result?.status == 401) {
      toast.error("パスワードに誤りがあります", {
        duration: 3000,
      });
    } else {
      toast.error("ログイン時にエラーが発生しました", {
        duration: 3000,
      });
    }
  }

  function isEnableSubmit() {
    return formState.isValid && !isLoading;
  }

  return (
    <form
      className="w-screen flex justify-center items-center flex-col"
      onSubmit={handleSubmit(onClickEmailLogin)}
    >
      {!isLoading && (
        <>
          <div className="mb-4">
            <EmailInputComponent
              register={register}
              errors={formState.errors}
            />
          </div>
          <div className="mb-4">
            <PasswordInputComponent
              register={register}
              errors={formState.errors}
            />
          </div>
          <button
            className={
              isEnableSubmit()
                ? "w-64 bg-blue-300 rounded px-4 py-2 border border-neutral-300"
                : "w-64 bg-gray-300 rounded px-4 py-2 border border-neutral-300"
            }
            disabled={!isEnableSubmit()}
          >
            メールでログイン
          </button>
          <div className="mt-4">
            パスワードを再設定する場合は
            <Link href="/auth/password_reset">
              <span className="text-sky-500 underline" role="button">
                こちら
              </span>
            </Link>
          </div>
        </>
      )}
      {isLoading && (
        <div className="w-8 h-8">
          <LoadingComponent />
        </div>
      )}
    </form>
  );
}
