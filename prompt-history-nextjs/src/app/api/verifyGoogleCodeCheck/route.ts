import { NextRequest } from "next/server";

import { verifyGoogleCodeCheckPostHandler } from "@/restHandler/verifyGoogleCodeCheckPostHandler";

export function POST(req: NextRequest) {
  return verifyGoogleCodeCheckPostHandler(req);
}
