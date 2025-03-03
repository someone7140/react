"use client";

import React, { FC, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/solid";

import { LatLonResponse } from "@/graphql/gen/graphql";
import { dialogBoxStyle } from "@/style/CommonStyle";

type Props = {
  latLon: LatLonResponse;
};

export const MapModalByLatLonComponent: FC<Props> = ({ latLon }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <MapPinIcon
        className="w-[20px] h-[25px] cursor-pointer"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      />
      <Dialog open={isDialogOpen} handler={closeDialog}>
        <div className={`${dialogBoxStyle()}`}>
          <iframe
            src={`http://maps.google.co.jp/maps?q=${latLon.lat},${latLon.lon}&output=embed&t=m&z=16&hl=ja`}
            loading="lazy"
            className="w-[99%] h-[280px]"
          ></iframe>
        </div>
        <div className="flex justify-center mt-3 mb-3">
          <Button color="blue-gray" onClick={closeDialog}>
            閉じる
          </Button>
        </div>
      </Dialog>
    </>
  );
};
