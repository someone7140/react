import { tv } from "tailwind-variants";

export const submitButtonStyle = tv({
  base: "bg-blue-500 cursor-pointer hover:bg-blue-700",
});

export const editButtonStyle = tv({
  base: "bg-orange-500 cursor-pointer hover:bg-orange-700",
});

export const deleteButtonStyle = tv({
  base: "bg-stone-400 cursor-pointer hover:bg-stone-600",
});

export const settingButtonStyle = tv({
  base: "bg-purple-500 cursor-pointer hover:bg-purple-700",
});

export const formLabelStyle = tv({
  base: "text-stone-500 font-semibold text-base",
  variants: {
    type: {
      required: "after:content-['*'] after:ml-0.5 after:text-red-500",
    },
  },
});
