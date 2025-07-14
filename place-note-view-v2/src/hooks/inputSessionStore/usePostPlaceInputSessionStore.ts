import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const postPlaceInputFormSchema = z.object({
  name: z.string().min(1, {
    message: "名前は必須です",
  }),
  address: z.string().optional(),
  categoryIdList: z.array(z.string()),
  detail: z.string().optional(),
  url: z.string().optional(),
});

export type PostPlaceInputFormType = z.infer<typeof postPlaceInputFormSchema>;

type PostPlaceInputSessionStore = {
  postPlaceInputSession: PostPlaceInputFormType | undefined;
  updatePostPlaceInputSession: (input?: PostPlaceInputFormType) => void;
};

export const usePostPlaceInputSessionStore =
  create<PostPlaceInputSessionStore>()(
    persist(
      (set) => ({
        postPlaceInputSession: undefined,
        updatePostPlaceInputSession: (input?: PostPlaceInputFormType) =>
          set({ postPlaceInputSession: input }),
      }),
      {
        name: "postPlaceInputSession",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
