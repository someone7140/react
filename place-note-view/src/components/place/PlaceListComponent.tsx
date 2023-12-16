"use client";

import React, { FC, ReactNode, useState } from "react";

import { PostPlaceResponse } from "@/gen/placeNotePostPlaceService_pb";
import { linkStyle } from "@/style/CommonStyle";

export type Props = {
  places: PostPlaceResponse[];
  placeActionRender: (
    place: PostPlaceResponse,
    refetch?: () => {}
  ) => ReactNode;
  refetch?: () => {};
};

export const PlaceListComponent: FC<Props> = ({
  places,
  placeActionRender,
  refetch,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {places.map((place) => {
        return (
          <div key={place.id} className="flex content-between items-center">
            <a
              href={`/myPlace/detail?place_id=${place.id}`}
              className={linkStyle()}
              target="_blank"
            >
              {place.name}
            </a>
            {placeActionRender(place, refetch)}
          </div>
        );
      })}
    </div>
  );
};
