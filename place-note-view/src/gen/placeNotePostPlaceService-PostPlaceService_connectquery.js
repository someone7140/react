// @generated by protoc-gen-connect-query v0.4.1 with parameter "target=js+dts"
// @generated from file placeNotePostPlaceService.proto (package placeNote, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { createQueryService } from "@bufbuild/connect-query";
import { Empty, MethodKind } from "@bufbuild/protobuf";
import { AddPostPlaceRequest, DeletePostPlaceRequest, GetPostPlaceByIdRequest, GetPostPlaceListResponse, PostPlaceResponse, UpdatePostPlaceRequest } from "./placeNotePostPlaceService_pb.js";

export const typeName = "placeNote.PostPlaceService";

/**
 * @generated from rpc placeNote.PostPlaceService.AddPostPlace
 */
export const addPostPlace = createQueryService({
  service: {
    methods: {
      addPostPlace: {
        name: "AddPostPlace",
        kind: MethodKind.Unary,
        I: AddPostPlaceRequest,
        O: Empty,
      },
    },
    typeName: "placeNote.PostPlaceService",
  },
}).addPostPlace;

/**
 * @generated from rpc placeNote.PostPlaceService.UpdatePostPlace
 */
export const updatePostPlace = createQueryService({
  service: {
    methods: {
      updatePostPlace: {
        name: "UpdatePostPlace",
        kind: MethodKind.Unary,
        I: UpdatePostPlaceRequest,
        O: Empty,
      },
    },
    typeName: "placeNote.PostPlaceService",
  },
}).updatePostPlace;

/**
 * @generated from rpc placeNote.PostPlaceService.DeletePostPlace
 */
export const deletePostPlace = createQueryService({
  service: {
    methods: {
      deletePostPlace: {
        name: "DeletePostPlace",
        kind: MethodKind.Unary,
        I: DeletePostPlaceRequest,
        O: Empty,
      },
    },
    typeName: "placeNote.PostPlaceService",
  },
}).deletePostPlace;

/**
 * @generated from rpc placeNote.PostPlaceService.GetPostPlaceList
 */
export const getPostPlaceList = createQueryService({
  service: {
    methods: {
      getPostPlaceList: {
        name: "GetPostPlaceList",
        kind: MethodKind.Unary,
        I: Empty,
        O: GetPostPlaceListResponse,
      },
    },
    typeName: "placeNote.PostPlaceService",
  },
}).getPostPlaceList;

/**
 * @generated from rpc placeNote.PostPlaceService.GetPostPlaceById
 */
export const getPostPlaceById = createQueryService({
  service: {
    methods: {
      getPostPlaceById: {
        name: "GetPostPlaceById",
        kind: MethodKind.Unary,
        I: GetPostPlaceByIdRequest,
        O: PostPlaceResponse,
      },
    },
    typeName: "placeNote.PostPlaceService",
  },
}).getPostPlaceById;
