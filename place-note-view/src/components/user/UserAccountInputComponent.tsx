"use client";

import React, { FC } from "react";

import { Button, Label, TextInput } from "flowbite-react";
import { Field, Form } from "houseform";
import { z } from "zod";

import {
  formBlockStyle,
  inputLabelStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import { errorMessageStyle } from "@/style/MessageStyle";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";

export type UserAccountRegisterForm = {
  userId: string;
  name: string;
};

type Props = {
  submitFunc: (form: UserAccountRegisterForm) => void;
  disabled?: boolean;
  errMsg?: string;
};

export const UserAccountInputComponent: FC<Props> = ({
  submitFunc,
  disabled,
  errMsg,
}) => {
  return (
    <Form<UserAccountRegisterForm>
      onSubmit={(values) => {
        submitFunc(values);
      }}
    >
      {({ submit }) => (
        <div>
          <Field<string>
            name="userId"
            onSubmitValidate={z.string().min(1, "ユーザIDの入力は必須です")}
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
            onSubmitValidate={z.string().min(1, "名前の入力は必須です")}
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
          {errMsg && (
            <div className={`${formBlockStyle()} ${errorMessageStyle()}`}>
              {errMsg}
            </div>
          )}
          <div className={`${centerHorizonContainerStyle()} mt-4`}>
            <Button
              color="success"
              pill
              onClick={() => {
                submit();
              }}
              disabled={disabled}
            >
              <p>登録</p>
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};
