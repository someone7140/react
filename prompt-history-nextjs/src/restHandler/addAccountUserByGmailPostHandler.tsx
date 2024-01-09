import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import {
  AuthUserResponse,
  GoogleAuthDataPayload,
} from "@/restHandler/common/commonRestType";
import { getErrorMessage } from "@/restHandler/common/errorHandling";
import { decodeJwtToken } from "@/restHandler/common/jwtUtil";
import { withZod } from "@/restHandler/common/withZod";
import {
  addAccountUserByGmail,
  gmailRegisteredCheck,
  userSettingIdRegisteredCheck,
} from "@/restHandler/externalApi/hasuraApiExecute";
import { makeHasuraToken } from "@/restHandler/externalApi/hasuraToken";

export const addAccountUserByGmailPostSchema = z.object({
  authToken: z.string().min(1, {
    message: "認証トークンは必須です",
  }),
  userSettingId: z.string().min(1, {
    message: "ユーザIDは必須です",
  }),
  name: z.string().min(1, {
    message: "ユーザ名は必須です",
  }),
});

export type AddAccountUserByGmailPostRequest = z.infer<
  typeof addAccountUserByGmailPostSchema
>;

export type AddAccountUserByGmailPostResponse = {
  addAccountUserByGmail: AuthUserResponse;
};

export const addAccountUserByGmailPostHandler = async (req: NextRequest) => {
  return withZod(
    addAccountUserByGmailPostSchema,
    req,
    async (reqValue: AddAccountUserByGmailPostRequest) => {
      // tokenを複合してgmailを取得
      let gmail = "";
      try {
        const decoded = decodeJwtToken<GoogleAuthDataPayload>(
          reqValue.authToken
        );
        gmail = decoded.gmail;
      } catch (e) {
        return NextResponse.json(
          { error: getErrorMessage(e) },
          { status: 401 }
        );
      }

      try {
        // gmailが重複しているか
        const isGmailRegistered = await gmailRegisteredCheck(gmail);
        if (isGmailRegistered) {
          return NextResponse.json(
            { error: "This Gmail user was registered" },
            { status: 403 }
          );
        }
        // ユーザ設定IDが重複しているか
        const isRegisteredUserSettingId = await userSettingIdRegisteredCheck(
          reqValue.userSettingId
        );
        if (isRegisteredUserSettingId) {
          return NextResponse.json(
            { error: "This userSettingId user was registered" },
            { status: 400 }
          );
        }
        // ユーザ登録
        const accountId = crypto.randomUUID();
        await addAccountUserByGmail(
          accountId,
          reqValue.userSettingId,
          reqValue.name,
          gmail
        );
        // tokenを生成してレスポンスを構築
        const responseData: AuthUserResponse = {
          authToken: makeHasuraToken(
            accountId,
            reqValue.userSettingId,
            reqValue.name,
            gmail
          ),
          userSettingId: reqValue.userSettingId,
          name: reqValue.name,
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
