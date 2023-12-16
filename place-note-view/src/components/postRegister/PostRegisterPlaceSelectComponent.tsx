"use client";

import React, { FC } from "react";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

import { PlaceListSelectComponent } from "@/components/place/PlaceListSelectComponent";
import { PostPlaceResponse } from "@/gen/placeNotePostPlaceService_pb";

export const PostRegisterPlaceSelectComponent: FC = ({}) => {
  const router = useRouter();

  const selectPlace = (place: PostPlaceResponse) => {
    return (
      <div className="ml-4">
        <Button
          color="purple"
          pill
          onClick={() => {
            router.push(`/myPostAdd/postRegister?place_id=${place.id}`);
          }}
        >
          <p>選択</p>
        </Button>
      </div>
    );
  };

  return <PlaceListSelectComponent placeActionRender={selectPlace} />;
};
