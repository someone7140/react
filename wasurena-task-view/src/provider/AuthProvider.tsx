"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Loader } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { useGetUserAccountFromAuthHeaderQuery } from "@/graphql/gen/graphql";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [authTokenLocalStorage] = useLocalStorage<string | undefined>({
    key: "authToken",
    defaultValue: undefined,
  });
  const [userAccountState, setUserAccountState] = useAtom(userAccountAtom);
  const { clearUserAccountState } = useAuthManagement();
  const [pauseFlag, setPauseFlag] = useState<boolean>(true); // トークンがそもそも無いまたは認証情報がすでにある
  const [{ data, fetching, error }] = useGetUserAccountFromAuthHeaderQuery({
    pause: pauseFlag,
  });

  useEffect(() => {
    if (userAccountState) {
      setPauseFlag(true);
    } else if (!authTokenLocalStorage) {
      setPauseFlag(true);
    } else {
      setPauseFlag(false);
    }
  }, [userAccountState, authTokenLocalStorage]);

  useEffect(() => {
    console.log(pauseFlag);
    if (!pauseFlag) {
      if (!fetching) {
        console.log(error);
        if (error) {
          clearUserAccountState();
        }
        console.log(data?.getUserAccountFromAuthHeader);
        if (data?.getUserAccountFromAuthHeader) {
          setUserAccountState(data.getUserAccountFromAuthHeader);
        }
        setLoadingAuth(false);
        setPauseFlag(true);
      } else {
        setLoadingAuth(true);
      }
    } else {
      setLoadingAuth(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseFlag, fetching, data, error]);

  return (
    <>
      {loadingAuth && <Loader size={30} />}
      {!loadingAuth && <>{children}</>}
    </>
  );
};
