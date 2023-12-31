import { z } from "zod";

import { getErrorMessage } from "@/restHandler/common/errorHandling";
import { withZod } from "@/restHandler/common/withZod";

import { NextRequest, NextResponse } from "next/server";

export type VerifyGoogleCodeCheckResponseData = {
  authToken: string;
};

export const verifyGoogleCodeCheckPostHandler = async (req: NextRequest) => {
  const zodSchema = z.object({
    authCode: z.string().min(1, {
      message: "認証コードは必須です",
    }),
  });

  return withZod(
    zodSchema,
    req,
    async (reqValue: z.infer<typeof zodSchema>) => {
      try {
        console.log(reqValue);
        const responseData: VerifyGoogleCodeCheckResponseData = {
          authToken: "token",
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
