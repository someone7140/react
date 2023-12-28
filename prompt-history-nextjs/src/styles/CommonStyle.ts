"use client";

import { tv } from "tailwind-variants";

export const buttonStyle = tv({
  base: "text-black",
  variants: {
    color: {
      indigo: "bg-indigo-400 hover:bg-indigo-500",
    },
  },
});
