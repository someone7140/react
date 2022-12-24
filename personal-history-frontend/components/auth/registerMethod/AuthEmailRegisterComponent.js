import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import toast from "react-hot-toast";

import LoadingComponent from "../../common/LoadingComponent";
import { useMutateApi } from "../../../services/api/ApiHooksService";
import { registerAuthByEmail } from "../../../services/api/auth/ApiAuthService";
import EmailInputComponent from "../input/EmailInputComponent";
import PasswordInputComponent from "../input/PasswordInputComponent";
import PasswordReInputComponent from "../input/PasswordReInputComponent";
import { useSharedState } from "../../../services/state/StateService";

export default function AuthEmailRegisterComponent() {
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });
  const { execPostApi, isLoading } = useMutateApi();
  const { sharedState: loginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  useEffect(() => {
    if (loginAuthSharedState) {
      Router.push("/");
    }
  }, [loginAuthSharedState]);

  async function registerEmail(data) {
    const result = await execPostApi({
      apiPath: "userAccount/registerAuthByEmail",
      execPost: function () {
        return registerAuthByEmail(data.email, data.password);
      },
    });
    if (result?.status == 200) {
      toast.success("認証用のメールを送信しました。", {
        duration: 3000,
      });
      Router.push("/");
    } else if (result?.status == 400) {
      toast.error("すでに登録済みのemailです", {
        duration: 3000,
      });
    } else {
      toast.error("メール送信時にエラーが発生しました", {
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
      onSubmit={handleSubmit(registerEmail)}
    >
      <div className="mb-4">
        <EmailInputComponent register={register} errors={formState.errors} />
      </div>
      <div className="mb-4">
        <PasswordInputComponent register={register} errors={formState.errors} />
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
        会員登録メール送信
      </button>
      {isLoading && (
        <div className="w-8 h-8 mt-2">
          <LoadingComponent />
        </div>
      )}
    </form>
  );
}
