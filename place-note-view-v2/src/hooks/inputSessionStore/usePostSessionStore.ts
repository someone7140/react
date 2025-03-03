import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const postInputFormSchema = z.object({
  title: z
    .string({
      required_error: "タイトルは必須です",
    })
    .min(1, {
      message: "タイトルは必須です",
    }),
  visitedDate: z.date({
    required_error: "訪問日は必須です",
  }),
  isOpen: z.boolean(),
  categoryIdList: z.array(z.string()),
  detail: z.string().optional(),
  urlList: z.array(z.string()),
});

export type PostInputFormType = z.infer<typeof postInputFormSchema>;

type PostInputSessionStore = {
  postInputSession: PostInputFormType | undefined;
  updatePostInputSession: (input?: PostInputFormType) => void;
};

export const usePostInputSessionStore = create<PostInputSessionStore>()(
  persist(
    (set) => ({
      postInputSession: undefined,
      updatePostInputSession: (input?: PostInputFormType) =>
        set({ postInputSession: input }),
    }),
    {
      name: "postInputSession",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
