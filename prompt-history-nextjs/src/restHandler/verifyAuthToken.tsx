import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { AuthUserResponse } from "@/restHandler/common/commonRestType";
import { getErrorMessage } from "@/restHandler/common/errorHandling";
import { withZod } from "@/restHandler/common/withZod";
import {
  CLAIM_KEY,
  decodeHasuraToken,
} from "@/restHandler/externalApi/hasura/hasuraToken";

const verifyAuthTokenPostSchema = z.object({
  authToken: z.string().min(1, {
    message: "認証トークンは必須です",
  }),
});

export type VerifyAuthTokenRequest = z.infer<typeof verifyAuthTokenPostSchema>;

export type VerifyAuthTokenResponse = {
  verifyAuthToken: AuthUserResponse;
};

export const verifyAuthToken = async (req: NextRequest) => {
  return withZod(
    verifyAuthTokenPostSchema,
    req,
    async (reqValue: VerifyAuthTokenRequest) => {
      // 認証トークンからユーザ取得
      try {
        const accountInfo = decodeHasuraToken(reqValue.authToken);
        if (accountInfo) {
          const responseData: AuthUserResponse = {
            authToken: reqValue.authToken,
            userSettingId:
              accountInfo[CLAIM_KEY]["x-hasura-custom-user-setting-id"],
            name: accountInfo[CLAIM_KEY]["x-hasura-custom-user-name"],
          };
          return NextResponse.json(responseData, { status: 200 });
        } else {
          return NextResponse.json(
            { error: "Can not get user" },
            { status: 401 }
          );
        }
      } catch (e) {
        return NextResponse.json(
          { error: getErrorMessage(e) },
          { status: 401 }
        );
      }
    }
  );
};
