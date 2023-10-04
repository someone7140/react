// @generated by protoc-gen-es v1.3.1 with parameter "target=js+dts"
// @generated from file placeNoteGeolocationService.proto (package placeNote, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message placeNote.GetLatLonFromAddressRequest
 */
export const GetLatLonFromAddressRequest = proto3.makeMessageType(
  "placeNote.GetLatLonFromAddressRequest",
  () => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message placeNote.LatLon
 */
export const LatLon = proto3.makeMessageType(
  "placeNote.LatLon",
  () => [
    { no: 1, name: "lat", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 2, name: "lon", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
  ],
);

/**
 * @generated from message placeNote.GetLatLonFromAddressResponse
 */
export const GetLatLonFromAddressResponse = proto3.makeMessageType(
  "placeNote.GetLatLonFromAddressResponse",
  () => [
    { no: 1, name: "latLon", kind: "message", T: LatLon },
  ],
);

