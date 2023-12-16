"use client";

import { tv } from "tailwind-variants";

export const componentContainerStyle = tv({
  base: "flex justify-center",
});

export const centerHorizonContainerStyle = tv({
  base: "flex justify-center",
});

export const componentColumnContainerStyle = tv({
  base: "flex flex-col gap-4 justify-center",
});

export const linkStyle = tv({
  base: "font-medium text-blue-600 dark:text-blue-500 hover:underline",
});
