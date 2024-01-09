import { JwtPayload } from "jsonwebtoken";

export type RestRequestType<T> = {
  input: T;
};

export interface GoogleAuthDataPayload extends JwtPayload {
  gmail: string;
}

export type AuthUserResponse = {
  authToken: string;
  userSettingId: string;
  name: string;
  imageUrl?: string;
};
