import { ValidationErrors } from "@react-types/shared";
import z from "zod";

z.config({
  customError: (iss) => {
    if (iss.input === undefined) {
      return "入力必須です";
    }
  },
});

export const halfSizeRegex = /^[\x00-\x7F]+$/;

export const getValidationErrors = (
  errors: string[] | undefined,
): ValidationErrors => {
  if (!errors) return {};

  return Object.fromEntries(
    Object.entries(errors).filter(([, v]) => v?.length),
  );
};
