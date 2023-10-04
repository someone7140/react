"use client";

import { AuthMethod } from "@/gen/placeNoteUserAccountService_pb";

export type AuthState = {
  authMethod: AuthMethod;
  token?: string;
};
