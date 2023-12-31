"use client";

import React, { FC, useState } from "react";

import { AuthGoogleComponent } from "@/components/feature/auth/AuthGoogleComponent";
import {
  UserAccountInputComponent,
  userAccountInputFormSchema,
} from "@/components/feature/userAccount/UserAccountInputComponent";
import { z } from "zod";

export const AuthUserAccountForRegisterComponent: FC = () => {
  const [googleAuthCode, setGoogleAuthCode] = useState<string | undefined>(
    undefined
  );

  const submitFunc = (data: z.infer<typeof userAccountInputFormSchema>) => {
    console.log(data);
  };

  return (
    <div>
      {!googleAuthCode && (
        <AuthGoogleComponent
          onAuthGoogle={(authCode: string) => {
            setGoogleAuthCode(authCode);
          }}
        />
      )}
      {googleAuthCode && <UserAccountInputComponent submitFunc={submitFunc} />}
    </div>
  );
};
