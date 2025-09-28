"use client";

import React, { FC } from "react";

import { NovelSettingResponse } from "@/graphql/gen/graphql";

type Props = {
  parentNovelSetting: NovelSettingResponse;
  novelsSettings: NovelSettingResponse[];
};

export const NovelSettingParentComponent: FC<Props> = ({
  parentNovelSetting,
  novelsSettings,
}) => {
  return <div>{parentNovelSetting.name}</div>;
};
