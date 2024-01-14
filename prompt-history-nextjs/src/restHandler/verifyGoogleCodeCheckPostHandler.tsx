import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { GoogleAuthDataPayload } from "@/restHandler/common/commonRestType";
import { getErrorMessage } from "@/restHandler/common/errorHandling";
import { makeJwtToken } from "@/restHandler/common/jwtUtil";
import { withZod } from "@/restHandler/common/withZod";
import { googleAuthByCode } from "@/restHandler/externalApi/google/googleAuth";
import { gmailRegisteredCheck } from "@/restHandler/externalApi/hasura/hasuraApiExecute";

const verifyGoogleCodeCheckPostSchema = z.object({
  authCode: z.string().min(1, {
    message: "認証コードは必須です",
  }),
});

export type VerifyGoogleCodeCheckRequest = z.infer<
  typeof verifyGoogleCodeCheckPostSchema
>;

type VerifyGoogleCodeCheckResponseData = {
  authToken: string;
};

export type VerifyGoogleCodeCheckResponse = {
  verifyGoogleCodeCheck: VerifyGoogleCodeCheckResponseData;
};

export const verifyGoogleCodeCheckPostHandler = async (req: NextRequest) => {
  return withZod(
    verifyGoogleCodeCheckPostSchema,
    req,
    async (reqValue: VerifyGoogleCodeCheckRequest) => {
      // 認証コードからgmail取得
      let gmail = "";
      try {
        const authInfo = await googleAuthByCode(reqValue.authCode);
        if (!authInfo.email) {
          return NextResponse.json(
            { error: "Can not get gmail" },
            { status: 401 }
          );
        } else {
          gmail = authInfo.email;
        }
      } catch (e) {
        return NextResponse.json(
          { error: getErrorMessage(e) },
          { status: 401 }
        );
      }

      // 登録の重複チェック後にトークンを生成
      try {
        const isRegistered = await gmailRegisteredCheck(gmail);
        if (isRegistered) {
          return NextResponse.json(
            { error: "This Gmail user was registered" },
            { status: 403 }
          );
        }

        const payload: GoogleAuthDataPayload = { gmail };
        const responseData: VerifyGoogleCodeCheckResponseData = {
          authToken: makeJwtToken(payload, "1h"),
        };
        return NextResponse.json(responseData, { status: 200 });
      } catch (e) {
        return NextResponse.json(
          { error: getErrorMessage(e) },
          { status: 500 }
        );
      }
    }
  );
};
