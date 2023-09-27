"use client";

import React, { FC, useState } from "react";

import { Button, Label, TextInput } from "flowbite-react";
import { Field, Form } from "houseform";
import { z } from "zod";

import { centerHorizonContainerStyle } from "@/style/CommonStyle";
import {
  formBlockStyle,
  inputLabelStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import { errorMessageStyle } from "@/style/MessageStyle";

export type PlaceRegisterForm = {
  name: string;
  urlList: string[];
  detail?: string;
  address?: string;
  lat?: number;
  lon?: number;
  prefectureCode?: string;
};

export const PlaceRegisterComponent: FC = ({}) => {
  const [isUseMapInputAddress, setIsUseMapInputAddress] =
    useState<boolean>(true);

  return (
    <Form<PlaceRegisterForm>
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ submit }) => (
        <div>
          <div className={`${centerHorizonContainerStyle()} mt-2`}>
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
          </div>
          <div className={`${centerHorizonContainerStyle()} mt-4`}>
            <Button
              color="success"
              pill
              onClick={() => {
                submit();
              }}
            >
              <p>登録</p>
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};
