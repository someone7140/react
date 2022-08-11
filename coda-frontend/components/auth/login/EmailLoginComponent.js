import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import EmailInputComponent from "../../common/input/EmailInputComponent";
import PasswordInputComponent from "../../common/input/PasswordInputComponent";
import { loginUserState } from "../../../atoms/LoginUser";
import { loginEmailApi } from "../../../services/api/ApiAuthService";

export default function EmailLoginComponent() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const [user, setUser] = useRecoilState(loginUserState);
  const [authUser, setAuthUser] = useState(undefined);
  const [apiError, setApiError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authUser && authUser.loginUser) {
      setUser(authUser);
      Router.push("/");
      toast("ログインしました");
    }
  }, [authUser]);

  function loginEmail(data) {
    setUser("");
    loginEmailApi(data.email, data.password, setApiError, setUser, setLoading);
  }

  return (
    <div class="text-center">
      <Form onSubmit={handleSubmit(loginEmail)}>
        <EmailInputComponent register={register} errors={errors} />
        <br />
        <PasswordInputComponent register={register} errors={errors} />
        <br />
        <Button
          variant={"primary"}
          type="submit"
          disabled={!formState.isValid || loading}
        >
          メールアドレスでログイン
          {loading && <img src="/loading.gif" />}
        </Button>
        {apiError && (
          <div>
            <br />
            <div className="text-danger">
              メールもしくはパスワードに誤りがあります
            </div>
          </div>
        )}
        <br />
        <br />
        パスワードを忘れた方は<a href="/auth/passwordResetRegister">こちら</a>
        <br />
        会員登録がお済みでない場合は
        <a href="/auth/authUserForRegister">こちら</a>
      </Form>
    </div>
  );
}
