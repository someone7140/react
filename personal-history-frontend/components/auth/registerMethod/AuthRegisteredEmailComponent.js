import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import toast from "react-hot-toast";

import LoadingComponent from "../../common/LoadingComponent";
import { useSharedState } from "../../../services/state/StateService";
import { useMutateApi } from "../../../services/api/ApiHooksService";
import { authRegisteredEmail } from "../../../services/api/auth/ApiAuthService";
import PasswordInputComponent from "../input/PasswordInputComponent";

export default function AuthRegisteredEmailComponent(prop) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { execPostApi, isLoading } = useMutateApi();
  const {
    sharedState: registerAuthSharedState,
    setSharedState: setRegisterAuthSharedState,
  } = useSharedState("registerAuthSharedState", undefined);

  useEffect(() => {
    if (registerAuthSharedState) {
      Router.push("/account/account_register");
    }
  }, [registerAuthSharedState]);

  async function authEmail(data) {
    const result = await execPostApi({
      apiPath: "userAccount/authEmailRegistered",
      execPost: function () {
        return authRegisteredEmail(prop.registerId, data.password);
      },
    });
    if (result?.status == 200) {
      setRegisterAuthSharedState(result.data);
    } else if (result?.status == 401) {
      toast.error(
        <div className=" flex flex-col">
          <div>パスワードに誤りがあるか有効期限が切れています。</div>
          <div>
            何度かお試し頂いた後、同様のエラーとなる場合は再度emailの登録をお願いします。
          </div>
        </div>,
        {
          duration: 3000,
        }
      );
    } else {
      toast.error("システムエラーが発生しました", {
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
      onSubmit={handleSubmit(authEmail)}
    >
      <div className="mb-4">
        email登録時に設定したパスワードを
        <br />
        入力してください
      </div>
      <div className="mb-4">
        <PasswordInputComponent register={register} errors={formState.errors} />
      </div>
      <button
        className={
          isEnableSubmit()
            ? "bg-blue-300 rounded px-4 py-2 border border-neutral-300"
            : "bg-gray-300 rounded px-4 py-2 border border-neutral-300"
        }
        disabled={!isEnableSubmit()}
      >
        パスワード認証
      </button>
      {isLoading && (
        <div className="w-8 h-8 mt-2">
          <LoadingComponent />
        </div>
      )}
    </form>
  );
}
