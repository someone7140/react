"use client";

import React, { useEffect } from "react";

import { LoadingComponent } from "@/components/common/LoadingComponent";
import { useGetUserAccountFromAuthHeaderQuery } from "@/graphql/gen/graphql";
import { useAppDispatch, useAppSelector } from "@/store/reduxStore";
import {
  clearUserAccount,
  updateUserAccount,
} from "@/store/slice/userAccountSlice";
import { clearAuthToken } from "@/store/slice/authStorageSlice";

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const userAccount = useAppSelector((state) => state.userAccount);
  const authStorage = useAppSelector((state) => state.authStorage);
  const dispatch = useAppDispatch();

  const { data, error, loading } = useGetUserAccountFromAuthHeaderQuery({
    fetchPolicy: "network-only",
    skip: !!userAccount || !authStorage.authToken,
  });

  useEffect(() => {
    if (error) {
      dispatch(clearUserAccount());
      dispatch(clearAuthToken());
    } else if (data?.getUserAccountFromAuthHeader) {
      const userData = data?.getUserAccountFromAuthHeader;
      dispatch(
        updateUserAccount({
          token: userData.token,
          userSettingId: userData.userSettingId,
          name: userData.name,
          imageUrl: userData.imageUrl,
        })
      );
    }
  }, [data, dispatch, error]);

  if (loading) {
    return <LoadingComponent />;
  }

  return <>{children}</>;
}
