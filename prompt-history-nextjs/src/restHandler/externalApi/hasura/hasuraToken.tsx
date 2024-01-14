import { JwtPayload } from "jsonwebtoken";

import { decodeJwtToken, makeJwtToken } from "@/restHandler/common/jwtUtil";

export const CLAIM_KEY = "https://hasura.io/jwt/claims";

interface HasuraTokenPayLoad extends JwtPayload {
  [CLAIM_KEY]: {
    ["x-hasura-default-role"]: string;
    ["x-hasura-allowed-roles"]: string[];
    ["x-hasura-user-id"]: string;
    ["x-hasura-custom-user-setting-id"]: string;
    ["x-hasura-custom-user-name"]: string;
    ["x-hasura-custom-image-url"]?: string;
  };
}

export const makeHasuraToken = (
  id: string,
  userSettingId: string,
  name: string,
  imageUrl?: string
) => {
  const payload: HasuraTokenPayLoad = {
    [CLAIM_KEY]: {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": id,
      "x-hasura-custom-user-setting-id": userSettingId,
      "x-hasura-custom-user-name": name,
      "x-hasura-custom-image-url": imageUrl,
    },
  };
  return makeJwtToken(payload, "180d");
};

export const decodeHasuraToken = (token: string) => {
  return decodeJwtToken<HasuraTokenPayLoad>(token);
};
