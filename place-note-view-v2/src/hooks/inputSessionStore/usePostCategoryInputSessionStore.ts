import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const postCategoryInputFormSchema = z.object({
  name: z.string().min(1, {
    message: "名前は必須です",
  }),
  parentCategoryId: z.string().optional(),
  displayOrder: z.number().or(z.nan()).optional(),
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
