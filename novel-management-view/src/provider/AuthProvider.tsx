"use client";

import React, { FC, useEffect } from "react";

import { LoadingComponent } from "@/components/common/LoadingComponent";
import { useGetUserAccountFromAuthHeaderQuery } from "@/graphql/gen/graphql";
import { useAppDispatch, useAppSelector } from "@/store/reduxStore";
import { updateUserAccount } from "@/store/slice/userAccountSlice";
import { clearAuthToken } from "@/store/slice/authStorageSlice";

export const AuthProvider: FC = ({ children }: React.PropsWithChildren) => {
  const userAccount = useAppSelector((state) => state.userAccount);
  const authToken = useAppSelector((state) => state.authToken);
  const dispatch = useAppDispatch();

  const { data, error, loading } = useGetUserAccountFromAuthHeaderQuery({
    fetchPolicy: "network-only",
    skip: !!userAccount || !authToken,
  });

  useEffect(() => {
    if (error) {
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
};
