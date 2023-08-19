"use client";

import React, { FC, useState } from "react";

import { Button, Label, TextInput } from "flowbite-react";
import { Field, Form } from "houseform";
import { z } from "zod";
import { MutationFunction, useMutation } from "@tanstack/react-query";

import { registerUser } from "@/gen/placeNote-UserService_connectquery";
import { AuthState } from "@/type/AuthType";
import {
  formBlockStyle,
  inputLabelStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import { errorMessageStyle } from "@/style/MessageStyle";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";
import { Code, ConnectError } from "@bufbuild/connect";
import { UserResponse } from "@/gen/placeNote_pb";

type Props = {
  authState: AuthState;
};

type UserRegisterForm = {
  userId: string;
  name: string;
};

export const UserRegisterComponent: FC<Props> = ({ authState }) => {
  const [registerErrorMsg, setRegisterErrorMsg] = useState<string | undefined>(
    undefined
  );

  const {
    mutationFn: registerUserMutationFn,
    onError: registerUserMutationOnError,
  } = registerUser.useMutation({
    onError: (err) => {
      if (err.code === Code.AlreadyExists) {
        setRegisterErrorMsg("すでに登録済みのユーザIDが入力されています");
      } else {
        setRegisterErrorMsg("登録時にエラーが発生しました");
      }
    },
  });
  const { mutate: registerUserMutate, isLoading: registerUserLoading } =
    useMutation<void, ConnectError, UserRegisterForm, unknown>(
      async (formValues: UserRegisterForm) => {
        const response = await registerUserMutationFn({
          authToken: authState.token,
          authMethod: authState.authMethod,
          userSettingId: formValues.userId,
          name: formValues.name,
        });
        console.log(response);
      },
      {
        onError: (err) => {
          if (registerUserMutationOnError) {
            registerUserMutationOnError(err);
          }
        },
      }
    );

  return (
    <Form<UserRegisterForm>
      onSubmit={(values) => {
        registerUserMutate(values);
      }}
    >
      {({ submit }) => (
        <div>
          <Field<string>
            name="userId"
            onSubmitValidate={z.string().nonempty("ユーザIDの入力は必須です")}
          >
            {({ value, setValue, errors }) => (
              <div className={formBlockStyle()}>
                <Label
                  htmlFor="userId"
                  value="ユーザID"
                  className={inputLabelStyle({ type: "required" })}
                />
                <TextInput
                  id="userId"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className={inputTextStyle()}
                />
                {errors.map((error) => (
                  <p key={error} className={errorMessageStyle()}>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </Field>
          <Field<string>
            name="name"
            onSubmitValidate={z.string().nonempty("名前の入力は必須です")}
          >
            {({ value, setValue, errors }) => (
              <div className={formBlockStyle()}>
                <Label
                  htmlFor="name"
                  value="名前"
                  className={inputLabelStyle({ type: "required" })}
                />
                <TextInput
                  id="name"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className={inputTextStyle()}
                />
                {errors.map((error) => (
                  <p key={error} className={errorMessageStyle()}>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </Field>
          {registerErrorMsg && (
            <div className={`${formBlockStyle()} ${errorMessageStyle()}`}>
              {registerErrorMsg}
            </div>
          )}
          <div className={`${centerHorizonContainerStyle()} mt-4`}>
            <Button
              color="success"
              pill
              onClick={() => {
                setRegisterErrorMsg(undefined);
                submit();
              }}
              disabled={registerUserLoading}
            >
              <p>登録</p>
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};
