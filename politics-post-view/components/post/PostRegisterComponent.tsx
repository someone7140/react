"use client";

import { FC } from "react";

import {
  PostInputComponent,
  PostInputFormType,
} from "./input/PostInputComponent";

export const PostRegisterComponent: FC = () => {
  const onSubmitRegister = async (form: PostInputFormType) => {
    console.log(form);
  };

  return (
    <PostInputComponent execSubmit={onSubmitRegister} disabledFlag={false} />
  );
};
