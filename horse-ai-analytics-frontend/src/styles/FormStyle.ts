"use client";

import { tv } from "tailwind-variants";

export const inputTextStyle = tv({
  base: "w-64 border-gray-400",
});

export const inputTextAreaStyle = tv({
  base: "border-gray-400 min-h-[120px] w-[500px] w-[95%]",
});

export const requiredMark = tv({
  base: "after:content-['*'] after:ml-0.5 after:text-red-500",
});
