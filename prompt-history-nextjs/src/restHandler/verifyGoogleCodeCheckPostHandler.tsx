import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import {
  AccountUsersByGmailDocument,
  AccountUsersByGmailQuery,
  AccountUsersByGmailQueryVariables,
} from "@/query/graphqlGen/graphql";
import { getErrorMessage } from "@/restHandler/common/errorHandling";
import { withZod } from "@/restHandler/common/withZod";
import { getHasuraClient } from "@/restHandler/externalApi/hasuraClient";

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
      try {
        console.log(reqValue);
        const isRegistered = await gmailRegisteredCheck("sample@gmail.com");
        if (isRegistered) {
          return NextResponse.json(
            { error: "This Gmail user was registered" },
            { status: 403 }
          );
        }
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

const gmailRegisteredCheck = async (gmail: string) => {
  const queryVariables: AccountUsersByGmailQueryVariables = { gmail };
  const { data: queryData } =
    await getHasuraClient().query<AccountUsersByGmailQuery>({
      query: AccountUsersByGmailDocument,
      variables: queryVariables,
    });
  console.log(queryData.account_users);
  return queryData?.account_users?.length > 0 ?? false;
};
