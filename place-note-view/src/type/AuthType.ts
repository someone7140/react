"use client";

import { AuthMethod } from "@/gen/placeNote_pb";

export type AuthState = {
  authMethod: AuthMethod;
  token?: string;
};
