import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

import { registerEmailAuthApi } from "../../../services/api/ApiMailAuthService";
import EmailInputComponent from "../../common/input/EmailInputComponent";
import PasswordInputComponent from "../../common/input/PasswordInputComponent";
import PasswordReInputComponent from "../../common/input/PasswordReInputComponent";

export default function EmailAuthComponent(prop) {
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onChange",
  });
  const [apiError, setApiError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  function registerEmail(data) {
    registerEmailAuthApi(
      data.email,
      data.password,
      setApiError,
      prop.setEmailRegistered,
      setLoading
    );
  }

  return (
    <div class="text-center">
      <Form onSubmit={handleSubmit(registerEmail)}>
        <EmailInputComponent register={register} errors={errors} />
        <br />
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
          メールアドレスで登録
          {loading && <img src="/loading.gif" />}
        </Button>

        {apiError && (
          <div>
            <br />
            <div className="text-danger">
              登録エラーが発生しました。すでに登録済みのメールアドレスでないかご確認ください。
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}
