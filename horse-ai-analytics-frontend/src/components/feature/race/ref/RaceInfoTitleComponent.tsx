"use client";

import React, { FC } from "react";

type Props = {
  raceName: string;
  raceDate: string;
};

export const RaceInfoTitleComponent: FC<Props> = ({ raceName, raceDate }) => {
  return (
    <>
      <div className="flex justify-between items-start gap-2 w-[100%]">
        <div className="break-all text-xl">{raceName}</div>
        <div>{raceDate}</div>
      </div>
    </>
  );
};
