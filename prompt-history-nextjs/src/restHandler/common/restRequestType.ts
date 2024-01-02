import { NextRequest, NextResponse } from "next/server";
import { z, ZodSchema } from "zod";

export type RestRequestType<T> = {
  input: T;
};
