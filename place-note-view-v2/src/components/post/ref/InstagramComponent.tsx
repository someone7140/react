"use client";

import React, { FC } from "react";
import { InstagramEmbed } from "react-social-media-embed";

import { PostUrl } from "@/graphql/gen/graphql";

type Props = {
  url: PostUrl;
};

export const InstagramComponent: FC<Props> = ({ url }) => {
  return (
    <div className="relative right-4">
      <InstagramEmbed url={url?.url} width={320} />
    </div>
  );
};
