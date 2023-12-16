"use client";

import React, { FC, useState } from "react";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

import { DeletePlaceModalComponent } from "@/components/placeRegister/DeletePlaceModalComponent";
import { PostPlaceResponse } from "@/gen/placeNotePostPlaceService_pb";

export type Props = {
  place: PostPlaceResponse;
  refetch?: () => {};
};

export const PlaceActionComponent: FC<Props> = ({ place, refetch }) => {
  const router = useRouter();
  const [deletePlace, setDeletePlace] = useState<PostPlaceResponse | undefined>(
    undefined
  );

  return (
    <>
      {refetch && (
        <div className="flex ml-4 gap-2">
          <Button
            color="purple"
            pill
            onClick={() => {
              router.push(`/myPlace/edit?place_id=${place.id}`);
            }}
          >
            <p>編集</p>
          </Button>
          <Button
            color="dark"
            pill
            onClick={() => {
              setDeletePlace(place);
            }}
          >
            <p>削除</p>
          </Button>
          <DeletePlaceModalComponent
            placeId={deletePlace?.id}
            name={deletePlace?.name}
            onClose={() => {
              setDeletePlace(undefined);
            }}
            refetch={refetch}
          />
        </div>
      )}
    </>
  );
};
