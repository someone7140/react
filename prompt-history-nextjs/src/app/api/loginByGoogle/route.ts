import { NextRequest } from "next/server";

import { loginByGooglePostHandler } from "@/restHandler/loginByGooglePostHandler";

export function POST(req: NextRequest) {
  return loginByGooglePostHandler(req);
}
