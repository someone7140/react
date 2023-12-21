// @generated by protoc-gen-es v1.4.1 with parameter "target=js+dts"
// @generated from file placeNotePostPlaceService.proto (package placeNote, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";
import { LatLon } from "./placeNoteCommon_pb.js";

/**
 * @generated from message placeNote.AddPostPlaceRequest
 */
export const AddPostPlaceRequest = proto3.makeMessageType(
  "placeNote.AddPostPlaceRequest",
  () => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 3, name: "latLon", kind: "message", T: LatLon, opt: true },
    { no: 4, name: "prefectureCode", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 5, name: "categoryIdList", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 6, name: "detail", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 7, name: "urlList", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ],
);

/**
 * @generated from message placeNote.UpdatePostPlaceRequest
 */
export const UpdatePostPlaceRequest = proto3.makeMessageType(
  "placeNote.UpdatePostPlaceRequest",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 4, name: "latLon", kind: "message", T: LatLon, opt: true },
    { no: 5, name: "prefectureCode", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 6, name: "categoryIdList", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 7, name: "detail", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 8, name: "urlList", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ],
);

/**
 * @generated from message placeNote.DeletePostPlaceRequest
 */
export const DeletePostPlaceRequest = proto3.makeMessageType(
  "placeNote.DeletePostPlaceRequest",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message placeNote.GetPostPlaceByIdRequest
 */
export const GetPostPlaceByIdRequest = proto3.makeMessageType(
  "placeNote.GetPostPlaceByIdRequest",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message placeNote.AddPostPlaceResponse
 */
export const AddPostPlaceResponse = proto3.makeMessageType(
  "placeNote.AddPostPlaceResponse",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message placeNote.PostPlaceResponse
 */
export const PostPlaceResponse = proto3.makeMessageType(
  "placeNote.PostPlaceResponse",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 4, name: "latLon", kind: "message", T: LatLon, opt: true },
    { no: 5, name: "prefectureCode", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 6, name: "categoryIdList", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 7, name: "detail", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 8, name: "urlList", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ],
);

/**
 * @generated from message placeNote.GetPostPlaceListResponse
 */
export const GetPostPlaceListResponse = proto3.makeMessageType(
  "placeNote.GetPostPlaceListResponse",
  () => [
    { no: 1, name: "placeList", kind: "message", T: PostPlaceResponse, repeated: true },
  ],
);

