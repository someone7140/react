"use client";

import { FC } from "react";
import { ValidationError } from "@tanstack/react-form";

type Props = {
  errors?: ValidationError[];
};

export const FormErrorMessageComponent: FC<Props> = ({ errors }) => {
  return (
    <>
      {errors ? (
        <div className="mt-1 ml-1 text-xs text-red-400">{errors[0]}</div>
      ) : null}
    </>
  );
};
