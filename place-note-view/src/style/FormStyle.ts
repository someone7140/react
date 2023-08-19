"use client";

import { tv } from "tailwind-variants";

export const formBlockStyle = tv({
  base: "mb-3 block",
});

export const inputLabelStyle = tv({
  base: "block text-base font-medium text-slate-700 mb-1",
  variants: {
    type: {
      required: "after:content-['*'] after:ml-0.5 after:text-red-500",
    },
  },
});

export const inputTextStyle = tv({
  base: "w-72",
});
