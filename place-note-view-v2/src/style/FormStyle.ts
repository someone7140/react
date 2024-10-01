import { tv } from "tailwind-variants";

export const formItemAreaStyle = tv({
  base: "flex flex-col mb-3",
});

export const formSubmitAreaStyle = tv({
  base: "w-[100%] flex justify-center gap-8 mt-5",
});

export const formLabelStyle = tv({
  base: "text-stone-500 mb-1",
  variants: {
    type: {
      required: "after:content-['*'] after:ml-0.5 after:text-red-500",
    },
  },
});

export const inputTextStyle = tv({
  base: " !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[330px] !font-semibold",
});

export const inputTextLabelStyle = tv({
  base: "before:content-none after:content-none",
});
