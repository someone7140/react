import { tv } from "tailwind-variants";

export const detailTextStyle = tv({
  base: "whitespace-pre-wrap text-wrap text-gray-600 break-all",
});

export const orderButtonStyle = tv({
  base: "p-1 border border-gray-400 text-sm",
  variants: {
    type: {
      selected: "bg-blue-200",
      notSelected: "cursor-pointer",
    },
  },
});

export const postListStyle = tv({
  base: "flex flex-col gap-5 max-w-[340px] overflow-auto",
  variants: {
    type: {
      myPost: "max-h-[69vh]",
      open: "max-h-[80vh]",
    },
  },
});
