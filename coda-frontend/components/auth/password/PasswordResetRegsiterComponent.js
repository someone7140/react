import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

import EmailInputComponent from "../../common/input/EmailInputComponent";
import { registerPasswordResetApi } from "../../../services/api/ApiMailAuthService";

export default function PasswordResetRegsiterComponent() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const [success, setSuccess] = useState(undefined);
  const [apiError, setApiError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  function registerPasswordReset(data) {
    registerPasswordResetApi(data.email, setApiError, setSuccess, setLoading);
  }

  return (
    <div class="text-center">
      {success === undefined && (
        <Form onSubmit={handleSubmit(registerPasswordReset)}>
          <EmailInputComponent register={register} errors={errors} />
          <br />
          <Button
            variant={"primary"}
            type="submit"
            disabled={!formState.isValid || loading}
          >
            パスワードリセットメール送信{loading && <img src="/loading.gif" />}
          </Button>

          {apiError && (
            <div>
              <br />
              <div className="text-danger">
                パスワードリセット登録メールの送信に失敗しました。メールアドレスが登録済みのものか再度ご確認ください。
              </div>
            </div>
          )}
        </Form>
      )}
      {success && (
        <span>
          パスワードリセット登録用のメールを送信しました。
          <br />
          そちらから変更を行ってください。
        </span>
      )}
    </div>
  );
}
