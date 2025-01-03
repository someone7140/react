"use client";

import React, { FC } from "react";
import { XEmbed } from "react-social-media-embed";

import { PostUrl } from "@/graphql/gen/graphql";

type Props = {
  url: PostUrl;
};

export const XContentsComponent: FC<Props> = ({ url }) => {
  return <XEmbed url={url?.url} width={300} />;
};
