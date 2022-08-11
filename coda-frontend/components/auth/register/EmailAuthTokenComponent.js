import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

import { emailTokenAuthApi } from "../../../services/api/ApiMailAuthService";
import PasswordInputComponent from "../../common/input/PasswordInputComponent";
import UserRegisterComponent from "../../user/UserRegisterComponent";

export default function EmailAuthTokenComponent(prop) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const [apiError, setApiError] = useState(undefined);
  const [authentication, setAuthenticaton] = useState(false);

  useEffect(() => {
    if (!prop.userId || !prop.token) {
      Router.push("/");
    }
  }, []);

  function registerEmail(data) {
    emailTokenAuthApi(
      prop.userId,
      data.password,
      prop.token,
      setApiError,
      setAuthenticaton
    );
  }

  return (
    <div class="text-center">
      {!authentication && (
        <Form onSubmit={handleSubmit(registerEmail)}>
          <PasswordInputComponent register={register} errors={errors} />
          <br />
          <Button
            variant={"primary"}
            type="submit"
            disabled={!formState.isValid}
          >
            会員登録へ進む
          </Button>

          {apiError && (
            <div>
              <br />
              <div className="text-danger">
                パスワードに誤りがあるかURLの有効期限が切れています。
                <br />
                再度操作してエラーとなる場合は
                <a href="/user/auth/authUserForRegister">こちら</a>
                より再度メールアドレスをご登録ください。
              </div>
            </div>
          )}
        </Form>
      )}
      {authentication && (
        <UserRegisterComponent userId={prop.userId} token={prop.token} />
      )}
    </div>
  );
}
