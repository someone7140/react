import { NextRequest, NextResponse } from "next/server";
import { z, ZodSchema } from "zod";

function searchParamsToValues(
  searchParams: URLSearchParams
): Record<string, any> {
  return Array.from(searchParams.keys()).reduce((record, key) => {
    const values = searchParams.getAll(key);
    return { ...record, [key]: values.length > 1 ? values : values[0] };
  }, {} as Record<string, any>);
}

function makeSearchParamsObjSchema<T extends ZodSchema>(schema: T) {
  return z
    .instanceof(URLSearchParams)
    .transform(searchParamsToValues)
    .pipe(schema);
}

export async function withZod<T extends ZodSchema>(
  schema: T,
  req: NextRequest,
  next: (reqValue: z.infer<T>) => Promise<NextResponse>
) {
  const parsed =
    req.method == "POST"
      ? schema.safeParse(await req.json())
      : makeSearchParamsObjSchema(schema).safeParse(req.nextUrl.searchParams);
  if (!parsed.success) {
    // 共通のバリデーションエラーレスポンスとして処理
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }
  return await next(parsed.data as z.infer<T>);
}
