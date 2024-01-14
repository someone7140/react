import { NextRequest } from "next/server";

import { verifyAuthToken } from "@/restHandler/verifyAuthToken";

export function POST(req: NextRequest) {
  return verifyAuthToken(req);
}
