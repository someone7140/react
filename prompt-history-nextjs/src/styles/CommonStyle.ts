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

export const toastStyle = tv({
  base: "'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
  variants: {
    textColor: {
      amber: "text-amber-100",
    },
  },
});
