"use client";

import { FC } from "react";

type Props = {
  message?: string;
};

export const FormErrorMessageComponent: FC<Props> = ({ message }) => {
  return (
    <>
      {message ? (
        <div className="mt-1 ml-1 text-xs text-red-400">{message}</div>
      ) : null}
    </>
  );
};
