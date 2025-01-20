import { tv } from "tailwind-variants";

export const pageTitleStyle = tv({
  base: "mb-4 font-bold text-xl",
});

export const dialogBoxStyle = tv({
  base: "flex flex-col items-center p-3",
  variants: {
    type: {
      scroll: "overflow-scroll",
    },
  },
});

export const linkStyle = tv({
  base: "underline text-blue-600 hover:text-blue-800",
});
