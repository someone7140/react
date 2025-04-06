"use client";

import { useSetAtom } from "jotai";
import { useLocalStorage } from "@mantine/hooks";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { UserAccountResponse } from "@/graphql/gen/graphql";

export const useAuthManagement = () => {
  const setUserAccountState = useSetAtom(userAccountAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAuthTokenStorage, removeAuthTokenStorage] = useLocalStorage<
    string | undefined
  >({
    key: "authToken",
    defaultValue: undefined,
  });

  // 認証情報の状態を設定する
  const updateUserAccountState = (userAccount: UserAccountResponse) => {
    setUserAccountState(userAccount);
    setAuthTokenStorage(userAccount.token);
  };

  // 認証情報の状態をクリアする
  const clearUserAccountState = () => {
    setUserAccountState(undefined);
    removeAuthTokenStorage();
  };

  return { updateUserAccountState, clearUserAccountState };
};
