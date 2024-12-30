"use client";

import React, { FC } from "react";
import Link from "next/link";

import { PostUrl } from "@/graphql/gen/graphql";

type Props = {
  url: PostUrl;
};

export const WebNoInfoComponent: FC<Props> = ({ url }) => {
  return (
    <Link
      href={url.url}
      rel="noopener noreferrer"
      target="_blank"
      className="w-95% truncate underline text-blue-600 hover:text-blue-800"
    >
      {url.url}
    </Link>
  );
};
