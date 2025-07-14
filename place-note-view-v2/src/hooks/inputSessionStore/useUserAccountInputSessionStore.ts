import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { halfSizeRegex } from "@/constants/ValidationConstants";

export const userAccountInputFormSchema = z.object({
  userSettingId: z
    .string()
    .min(1, {
      message: "ユーザIDは必須です",
    })
    .regex(halfSizeRegex, "半角文字で入力してください"),
  name: z.string().min(1, {
    message: "名前は必須です",
  }),
  urlList: z.array(z.string()),
  detail: z.string().optional(),
  imageFile: z.custom<File>().optional(),
  authToken: z.string().optional(),
});

export type UserAccountInputFormType = z.infer<
  typeof userAccountInputFormSchema
>;

type UserAccountInputSessionStore = {
  userAccountInputSession: UserAccountInputFormType | undefined;
  updateUserAccountInputSession: (input?: UserAccountInputFormType) => void;
};

export const useUserAccountInputSessionStore =
  create<UserAccountInputSessionStore>()(
    persist(
      (set) => ({
        userAccountInputSession: undefined,
        updateUserAccountInputSession: (input?: UserAccountInputFormType) =>
          set({ userAccountInputSession: input }),
      }),
      {
        name: "userAccountInputSession",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
