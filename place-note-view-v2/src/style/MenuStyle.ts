import { tv } from "tailwind-variants";

export const menuStyle = tv({
  base: "flex gap-1 cursor-pointer w-[100%] items-center",
  variants: {
    type: {
      marginLeft: "ml-2",
    },
  },
});
