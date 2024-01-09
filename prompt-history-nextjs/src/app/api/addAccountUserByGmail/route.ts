import { NextRequest } from "next/server";

import { addAccountUserByGmailPostHandler } from "@/restHandler/addAccountUserByGmailPostHandler";

export function POST(req: NextRequest) {
  return addAccountUserByGmailPostHandler(req);
}
