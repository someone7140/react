"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { PostUrl } from "@/graphql/gen/graphql";

type Props = {
  url: PostUrl;
};

export const WebWithInfoComponent: FC<Props> = ({ url }) => {
  const [loadImageError, setLoadImageError] = useState<boolean>(false);

  return (
    <div className="w-[99%] border p-2">
      <Link href={url.url} rel="noopener noreferrer" target="_blank">
        <div className={"text-wrap break-all text-black text-lg"}>
          {url.urlInfo?.title}
        </div>
        {url.urlInfo?.imageUrl && !loadImageError && (
          <img
            src={url.urlInfo?.imageUrl}
            className="w-[100%] h-[150px]"
            onError={(e) => {
              setLoadImageError(true);
            }}
            alt={url.urlInfo?.title}
          />
        )}
        {url.urlInfo?.siteName && (
          <div className={"text-wrap break-all text-black mt-1"}>
            【{url.urlInfo?.siteName}】
          </div>
        )}
      </Link>
    </div>
  );
};
