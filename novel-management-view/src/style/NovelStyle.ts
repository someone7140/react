import { tv } from "tailwind-variants";

export const novelTitleStyle = tv({
  base: "text-xl whitespace-pre-wrap text-wrap break-all w-[95%]",
});

export const novelDescriptionStyle = tv({
  base: "whitespace-pre-wrap text-wrap text-gray-600 break-all w-[95%] text-sm",
});

export const novelTextareaStyle = tv({
  base: "w-[95%] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
});

export const dialogStyle = tv({
  base: "max-h-[95vh] overflow-y-auto",
});
