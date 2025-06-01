"use client";

import React, { FC, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@heroui/react";
import { Modal, ModalContent, ModalBody, ModalFooter } from "@heroui/modal";

import { LatLonResponse } from "@/graphql/gen/graphql";
import { dialogBoxStyle } from "@/style/CommonStyle";

type Props = {
  latLon: LatLonResponse;
};

export const MapModalByLatLonComponent: FC<Props> = ({ latLon }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
  };

  return (
    <>
      <MapPinIcon
        className="w-[20px] h-[25px] cursor-pointer"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      />
      <Modal isOpen={isDialogOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className={`${dialogBoxStyle()}`}>
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
              </ModalBody>
              <ModalFooter className="flex justify-center mb-3">
                <Button color="default" onPress={onClose}>
                  閉じる
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
