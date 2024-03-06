"use client";

import { tv } from "tailwind-variants";

export const menuHeaderContainerStyle = tv({
  base: "flex justify-between mr-4 w-[100%]",
});

export const menuHeaderNavigationContentStyle = tv({
  base: "grid w-[100px] gap-3 p-4 md:w-[300px] md:grid-cols-1 lg:w-[400px]",
});

export const menuHeaderNavigationMenuRecordStyle = tv({
  base: "w-[100%] cursor-pointer",
});
