import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { loginUserState } from "../../../atoms/LoginUser";
import { changePassswordApi } from "../../../services/api/ApiMailAuthService";
import PasswordInputComponent from "../../common/input/PasswordInputComponent";
import PasswordReInputComponent from "../../common/input/PasswordReInputComponent";

export default function PasswordChangeComponent() {
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onChange",
  });
  const [user, setUser] = useRecoilState(loginUserState);
  const [success, setSuccess] = useState(undefined);
  const [apiError, setApiError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  function changePassword(data) {
    changePassswordApi(
      data.password,
      setApiError,
      setSuccess,
      user,
      setLoading
    );
  }

  useEffect(() => {
    if (success) {
      toast("パスワードを変更しました。");
      Router.push("/");
    }
  }, [success]);

  return (
    <div class="text-center">
      <Form onSubmit={handleSubmit(changePassword)}>
        <PasswordInputComponent register={register} errors={errors} />
        <br />
        <PasswordReInputComponent
          register={register}
          errors={errors}
          password={getValues("password")}
        />
        <br />
        パスワードは6文字以上で入力してください。
        <br />
        半角で英字・数字・記号が使用できます。
        <br />
        <br />
        <Button
          variant={"primary"}
          type="submit"
          disabled={!formState.isValid || loading}
        >
          パスワードを変更{loading && <img src="/loading.gif" />}
        </Button>

        {apiError && (
          <div>
            <br />
            <div className="text-danger">
              登録エラーが発生しました。再度操作の上エラーが発生する場合はお問い合わせください。
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}
