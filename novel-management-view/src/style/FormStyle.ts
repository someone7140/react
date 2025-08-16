import { tv } from "tailwind-variants";

export const submitButtonStyle = tv({
  base: "bg-blue-500 cursor-pointer hover:bg-blue-700",
});

export const formLabelStyle = tv({
  base: "text-stone-500 font-semibold text-base",
  variants: {
    type: {
      required: "after:content-['*'] after:ml-0.5 after:text-red-500",
    },
  },
});

export const formInputStyle = tv({
  base: "w-[280px]",
});
