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

// date型はそのままparseができないので一旦string型で持つ
export type PostInputSessionType = Omit<PostInputFormType, "visitedDate"> & {
  visitedDateStr?: string;
};

type PostInputSessionStore = {
  postInputSession: PostInputSessionType | undefined;
  updatePostInputSession: (input?: PostInputFormType) => void;
};

export const usePostInputSessionStore = create<PostInputSessionStore>()(
  persist(
    (set) => ({
      postInputSession: undefined,
      updatePostInputSession: (input?: PostInputFormType) => {
        if (input) {
          set({
            postInputSession: {
              ...input,
              visitedDateStr: input?.visitedDate.toDateString(),
            },
          });
        } else {
          set({
            postInputSession: undefined,
          });
        }
      },
    }),
    {
      name: "postInputSession",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
