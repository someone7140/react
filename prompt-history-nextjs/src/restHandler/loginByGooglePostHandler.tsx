import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { AuthUserResponse } from "@/restHandler/common/commonRestType";
import { getErrorMessage } from "@/restHandler/common/errorHandling";
import { withZod } from "@/restHandler/common/withZod";
import { googleAuthByCode } from "@/restHandler/externalApi/google/googleAuth";
import { getHasuraClient } from "@/restHandler/externalApi/hasura/hasuraClient";
import { makeHasuraToken } from "@/restHandler/externalApi/hasura/hasuraToken";
import {
  AccountUsersByGmailDocument,
  AccountUsersByGmailQuery,
  AccountUsersByGmailQueryVariables,
} from "@/query/graphqlGen/graphql";

const loginByGooglePostSchema = z.object({
  authCode: z.string().min(1, {
    message: "認証コードは必須です",
  }),
});

export type LoginByGoogleRequest = z.infer<typeof loginByGooglePostSchema>;

export type LoginByGoogleResponse = {
  loginByGoogle: AuthUserResponse;
};

export const loginByGooglePostHandler = async (req: NextRequest) => {
  return withZod(
    loginByGooglePostSchema,
    req,
    async (reqValue: LoginByGoogleRequest) => {
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

      // gmailからユーザ取得
      try {
        const queryVariables: AccountUsersByGmailQueryVariables = { gmail };
        const { data: queryData } =
          await getHasuraClient().query<AccountUsersByGmailQuery>({
            query: AccountUsersByGmailDocument,
            variables: queryVariables,
          });

        if (queryData?.account_users?.length > 0) {
          const accountUser = queryData.account_users[0];
          // tokenを生成してレスポンスを構築
          const responseData: AuthUserResponse = {
            authToken: makeHasuraToken(
              accountUser.id,
              accountUser.userSettingId,
              accountUser.name,
              gmail
            ),
            userSettingId: accountUser.userSettingId,
            name: accountUser.name,
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
          { status: 500 }
        );
      }
    }
  );
};
