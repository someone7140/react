"use client";

import React, { FC, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

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
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={{
              longitude: latLon.lon,
              latitude: latLon.lat,
              zoom: 13.5,
            }}
            style={{ width: "99%", height: 280 }}
            mapStyle="mapbox://styles/someone7140/cm804bvgs00ef01ssgki6acs1"
          >
            <Marker
              longitude={latLon.lon}
              latitude={latLon.lat}
              anchor="bottom"
            ></Marker>
          </Map>
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
