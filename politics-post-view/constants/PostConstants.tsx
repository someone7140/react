export const POST_STATUSES = [
  { key: "DRAFT", label: "下書き" },
  { key: "OPEN", label: "公開" },
  { key: "PRIVATE", label: "非公開" },
] as const;
export type PostStatusKey = (typeof POST_STATUSES)[number]["key"];
export const POST_STATUS_KEYS = POST_STATUSES.map((p) => p.key) as [
  PostStatusKey,
  ...PostStatusKey[],
];
