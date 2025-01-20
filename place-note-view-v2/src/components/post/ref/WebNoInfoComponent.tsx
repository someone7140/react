"use client";

import React, { FC } from "react";
import Link from "next/link";

import { PostUrl } from "@/graphql/gen/graphql";
import { linkStyle } from "@/style/CommonStyle";

type Props = {
  url: PostUrl;
};

export const WebNoInfoComponent: FC<Props> = ({ url }) => {
  return (
    <Link
      href={url.url}
      rel="noopener noreferrer"
      target="_blank"
      className={`w-[98%] truncate ${linkStyle()}`}
    >
      {url.url}
    </Link>
  );
};
