"use client";

import { authGoogleCode } from "@/gen/placeNote-UserService_connectquery";
import { useMutation } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import React, { FC } from "react";

export const AuthGoogleComponent: FC = () => {
  const { mutationFn: authMutationFn } = authGoogleCode.useMutation();
  const { mutate: authMutate, isLoading: authLoading } = useMutation(
    async (authCode: string) => {
      const aaaa = await authMutationFn({ authCode });
      console.log(aaaa);
    }
  );

  const onAuthClick = () => {
    authMutate("aaaa");
  };

  return (
    <Button color="purple" pill onClick={onAuthClick}>
      <p>Google認証</p>
    </Button>
  );
};
