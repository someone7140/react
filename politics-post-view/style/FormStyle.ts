import { tv } from "tailwind-variants";

export const formItemAreaStyle = tv({
  base: "mb-4",
});

export const formSubmitAreaStyle = tv({
  base: "w-[100%] flex justify-center gap-8 mt-4",
});

export const inputTextStyle = tv({
  base: "!border !border-gray-300 focus:!border-gray-700 min-w-[330px]",
  variants: {
    type: {
      short: "min-w-[130px] max-w-[200px]",
    },
  },
});
