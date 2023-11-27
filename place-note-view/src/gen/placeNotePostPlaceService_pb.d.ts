// @generated by protoc-gen-es v1.4.1 with parameter "target=js+dts"
// @generated from file placeNotePostPlaceService.proto (package placeNote, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import type { LatLon } from "./placeNoteCommon_pb.js";

/**
 * @generated from message placeNote.AddPostPlaceRequest
 */
export declare class AddPostPlaceRequest extends Message<AddPostPlaceRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from field: optional string address = 2;
   */
  address?: string;

  /**
   * @generated from field: optional placeNote.LatLon latLon = 3;
   */
  latLon?: LatLon;

  /**
   * @generated from field: optional string prefectureCode = 4;
   */
  prefectureCode?: string;

  /**
   * @generated from field: repeated string categoryIdList = 5;
   */
  categoryIdList: string[];

  /**
   * @generated from field: optional string detail = 6;
   */
  detail?: string;

  /**
   * @generated from field: repeated string urlList = 7;
   */
  urlList: string[];

  constructor(data?: PartialMessage<AddPostPlaceRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.AddPostPlaceRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddPostPlaceRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddPostPlaceRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddPostPlaceRequest;

  static equals(a: AddPostPlaceRequest | PlainMessage<AddPostPlaceRequest> | undefined, b: AddPostPlaceRequest | PlainMessage<AddPostPlaceRequest> | undefined): boolean;
}

/**
 * @generated from message placeNote.UpdatePostPlaceRequest
 */
export declare class UpdatePostPlaceRequest extends Message<UpdatePostPlaceRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * @generated from field: optional string address = 3;
   */
  address?: string;

  /**
   * @generated from field: optional placeNote.LatLon latLon = 4;
   */
  latLon?: LatLon;

  /**
   * @generated from field: optional string prefectureCode = 5;
   */
  prefectureCode?: string;

  /**
   * @generated from field: repeated string categoryIdList = 6;
   */
  categoryIdList: string[];

  /**
   * @generated from field: optional string detail = 7;
   */
  detail?: string;

  /**
   * @generated from field: repeated string urlList = 8;
   */
  urlList: string[];

  constructor(data?: PartialMessage<UpdatePostPlaceRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.UpdatePostPlaceRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdatePostPlaceRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdatePostPlaceRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdatePostPlaceRequest;

  static equals(a: UpdatePostPlaceRequest | PlainMessage<UpdatePostPlaceRequest> | undefined, b: UpdatePostPlaceRequest | PlainMessage<UpdatePostPlaceRequest> | undefined): boolean;
}

/**
 * @generated from message placeNote.DeletePostPlaceRequest
 */
export declare class DeletePostPlaceRequest extends Message<DeletePostPlaceRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  constructor(data?: PartialMessage<DeletePostPlaceRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.DeletePostPlaceRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeletePostPlaceRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeletePostPlaceRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeletePostPlaceRequest;

  static equals(a: DeletePostPlaceRequest | PlainMessage<DeletePostPlaceRequest> | undefined, b: DeletePostPlaceRequest | PlainMessage<DeletePostPlaceRequest> | undefined): boolean;
}

/**
 * @generated from message placeNote.GetPostPlaceByIdRequest
 */
export declare class GetPostPlaceByIdRequest extends Message<GetPostPlaceByIdRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  constructor(data?: PartialMessage<GetPostPlaceByIdRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.GetPostPlaceByIdRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostPlaceByIdRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostPlaceByIdRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostPlaceByIdRequest;

  static equals(a: GetPostPlaceByIdRequest | PlainMessage<GetPostPlaceByIdRequest> | undefined, b: GetPostPlaceByIdRequest | PlainMessage<GetPostPlaceByIdRequest> | undefined): boolean;
}

/**
 * @generated from message placeNote.PostPlaceResponse
 */
export declare class PostPlaceResponse extends Message<PostPlaceResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * @generated from field: optional string address = 3;
   */
  address?: string;

  /**
   * @generated from field: optional placeNote.LatLon latLon = 4;
   */
  latLon?: LatLon;

  /**
   * @generated from field: optional string prefectureCode = 5;
   */
  prefectureCode?: string;

  /**
   * @generated from field: repeated string categoryIdList = 6;
   */
  categoryIdList: string[];

  /**
   * @generated from field: optional string detail = 7;
   */
  detail?: string;

  /**
   * @generated from field: repeated string urlList = 8;
   */
  urlList: string[];

  constructor(data?: PartialMessage<PostPlaceResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.PostPlaceResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PostPlaceResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PostPlaceResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PostPlaceResponse;

  static equals(a: PostPlaceResponse | PlainMessage<PostPlaceResponse> | undefined, b: PostPlaceResponse | PlainMessage<PostPlaceResponse> | undefined): boolean;
}

/**
 * @generated from message placeNote.GetPostPlaceListResponse
 */
export declare class GetPostPlaceListResponse extends Message<GetPostPlaceListResponse> {
  /**
   * @generated from field: repeated placeNote.PostPlaceResponse placeList = 1;
   */
  placeList: PostPlaceResponse[];

  constructor(data?: PartialMessage<GetPostPlaceListResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.GetPostPlaceListResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostPlaceListResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostPlaceListResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostPlaceListResponse;

  static equals(a: GetPostPlaceListResponse | PlainMessage<GetPostPlaceListResponse> | undefined, b: GetPostPlaceListResponse | PlainMessage<GetPostPlaceListResponse> | undefined): boolean;
}

