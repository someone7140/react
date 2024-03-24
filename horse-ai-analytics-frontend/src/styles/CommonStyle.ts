"use client";

import { tv } from "tailwind-variants";

export const buttonStyle = tv({
  base: "text-black",
  variants: {
    color: {
      indigo: "bg-indigo-300 hover:bg-indigo-400",
      gray: "bg-gray-200 hover:bg-gray-300",
      lime: "bg-lime-200 hover:bg-lime-300",
      cyan: "bg-cyan-100 hover:bg-cyan-300",
    },
  },
});

export const toastStyle = tv({
  variants: {
    textColor: {
      amber: "text-amber-100",
      black: "text-black",
    },
  },
});
