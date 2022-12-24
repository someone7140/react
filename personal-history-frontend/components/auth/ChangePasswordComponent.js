import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import toast from "react-hot-toast";

import LoadingComponent from "../common/LoadingComponent";
import { useMutateApi } from "../../services/api/ApiHooksService";
import { changePassword } from "../../services/api/auth/ApiAuthService";
import PasswordInputComponent from "./input/PasswordInputComponent";
import PasswordReInputComponent from "./input/PasswordReInputComponent";
import { useSharedState } from "../../services/state/StateService";

export default function ChangePasswordComponent() {
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });
  const { execPostApi, isLoading } = useMutateApi();
  const { sharedState: loginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  async function changePasswordSubmit(data) {
    const result = await execPostApi({
      apiPath: "userAccount/changePassword",
      execPost: function () {
        return changePassword(loginAuthSharedState.token, data.password);
      },
    });
    if (result?.status == 200) {
      toast.success("パスワードを変更しました。", {
        duration: 3000,
      });
      Router.push("/");
    } else {
      toast.error("変更時にエラーが発生しました", {
        duration: 3000,
      });
    }
  }

  function isEnableSubmit() {
    return formState.isValid && !isLoading;
  }

  return (
    <>
      {loginAuthSharedState && (
        <form
          className="w-screen flex justify-center items-center flex-col"
          onSubmit={handleSubmit(changePasswordSubmit)}
        >
          <div className="mb-4">
            <PasswordInputComponent
              register={register}
              errors={formState.errors}
            />
          </div>
          <div className="mb-4">
            <PasswordReInputComponent
              register={register}
              errors={formState.errors}
              password={getValues("password")}
            />
          </div>
          <button
            className={
              isEnableSubmit()
                ? "bg-blue-300 rounded px-4 py-2 border border-neutral-300"
                : "bg-gray-300 rounded px-4 py-2 border border-neutral-300"
            }
            disabled={!isEnableSubmit()}
          >
            パスワード変更
          </button>
          {isLoading && (
            <div className="w-8 h-8 mt-2">
              <LoadingComponent />
            </div>
          )}
        </form>
      )}
    </>
  );
}
