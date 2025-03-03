import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { numberInputConvert } from "@/utils/formUtil";

export const postCategoryInputFormSchema = z.object({
  name: z
    .string({
      required_error: "名前は必須です",
    })
    .min(1, {
      message: "名前は必須です",
    }),
  parentCategoryId: z.string().optional(),
  displayOrder: z.preprocess(
    numberInputConvert,
    z
      .number({
        invalid_type_error: "表示順は数値を入力してください",
      })
      .optional()
  ),
  detail: z.string().optional(),
});

export type PostCategoryInputFormType = z.infer<
  typeof postCategoryInputFormSchema
>;

type PostCategoryInputSessionStore = {
  postCategoryInputSession: PostCategoryInputFormType | undefined;
  updatePostCategoryInputSession: (input?: PostCategoryInputFormType) => void;
};

export const usePostCategoryInputSessionStore =
  create<PostCategoryInputSessionStore>()(
    persist(
      (set) => ({
        postCategoryInputSession: undefined,
        updatePostCategoryInputSession: (input?: PostCategoryInputFormType) =>
          set({ postCategoryInputSession: input }),
      }),
      {
        name: "postCategoryInputSession",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
