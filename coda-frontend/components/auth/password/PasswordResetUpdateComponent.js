import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import PasswordInputComponent from "../../common/input/PasswordInputComponent";
import PasswordReInputComponent from "../../common/input/PasswordReInputComponent";
import { passwordResetUpdateApi } from "../../../services/api/ApiMailAuthService";

export default function PasswordResetUpdateComponent(prop) {
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onChange",
  });
  const [success, setSuccess] = useState(undefined);
  const [apiError, setApiError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!prop.userId || !prop.token) {
      Router.push("/");
    }
  }, []);

  function updatePassword(data) {
    passwordResetUpdateApi(
      data.password,
      prop.userId,
      prop.token,
      setApiError,
      setSuccess,
      setLoading
    );
  }

  useEffect(() => {
    if (success) {
      toast("パスワードの変更が完了しました。");
      Router.push("/");
    }
  }, [success]);

  return (
    <div class="text-center">
      {!success && (
        <Form onSubmit={handleSubmit(updatePassword)}>
          <PasswordInputComponent register={register} errors={errors} />
          <br />
          <PasswordReInputComponent
            register={register}
            errors={errors}
            password={getValues("password")}
          />
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
                登録エラーが発生しました。有効期限が切れていないか確認の上、再度操作してエラーとなる場合は
                <br />
                <a href="/auth/passwordResetRegister">こちら</a>
                より再度パスワードリセットの登録を行ってください。
              </div>
            </div>
          )}
        </Form>
      )}
    </div>
  );
}
