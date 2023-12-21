// @generated by protoc-gen-es v1.4.1 with parameter "target=js+dts"
// @generated from file placeNotePostCategoryService.proto (package placeNote, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message placeNote.AddPostCategoryRequest
 */
export declare class AddPostCategoryRequest extends Message<AddPostCategoryRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from field: optional string parentId = 2;
   */
  parentId?: string;

  /**
   * @generated from field: optional string memo = 3;
   */
  memo?: string;

  /**
   * @generated from field: optional int32 displayOrder = 4;
   */
  displayOrder?: number;

  constructor(data?: PartialMessage<AddPostCategoryRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.AddPostCategoryRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddPostCategoryRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddPostCategoryRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddPostCategoryRequest;

  static equals(a: AddPostCategoryRequest | PlainMessage<AddPostCategoryRequest> | undefined, b: AddPostCategoryRequest | PlainMessage<AddPostCategoryRequest> | undefined): boolean;
}

/**
 * @generated from message placeNote.UpdatePostCategoryRequest
 */
export declare class UpdatePostCategoryRequest extends Message<UpdatePostCategoryRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * @generated from field: optional string parentId = 3;
   */
  parentId?: string;

  /**
   * @generated from field: optional string memo = 4;
   */
  memo?: string;

  /**
   * @generated from field: optional int32 displayOrder = 5;
   */
  displayOrder?: number;

  constructor(data?: PartialMessage<UpdatePostCategoryRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.UpdatePostCategoryRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdatePostCategoryRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdatePostCategoryRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdatePostCategoryRequest;

  static equals(a: UpdatePostCategoryRequest | PlainMessage<UpdatePostCategoryRequest> | undefined, b: UpdatePostCategoryRequest | PlainMessage<UpdatePostCategoryRequest> | undefined): boolean;
}

/**
 * @generated from message placeNote.DeletePostCategoryRequest
 */
export declare class DeletePostCategoryRequest extends Message<DeletePostCategoryRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  constructor(data?: PartialMessage<DeletePostCategoryRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.DeletePostCategoryRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeletePostCategoryRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeletePostCategoryRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeletePostCategoryRequest;

  static equals(a: DeletePostCategoryRequest | PlainMessage<DeletePostCategoryRequest> | undefined, b: DeletePostCategoryRequest | PlainMessage<DeletePostCategoryRequest> | undefined): boolean;
}

/**
 * @generated from message placeNote.GetPostCategoryByIdRequest
 */
export declare class GetPostCategoryByIdRequest extends Message<GetPostCategoryByIdRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  constructor(data?: PartialMessage<GetPostCategoryByIdRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.GetPostCategoryByIdRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostCategoryByIdRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostCategoryByIdRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostCategoryByIdRequest;

  static equals(a: GetPostCategoryByIdRequest | PlainMessage<GetPostCategoryByIdRequest> | undefined, b: GetPostCategoryByIdRequest | PlainMessage<GetPostCategoryByIdRequest> | undefined): boolean;
}

/**
 * @generated from message placeNote.PostCategoryResponse
 */
export declare class PostCategoryResponse extends Message<PostCategoryResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * @generated from field: optional string parentId = 3;
   */
  parentId?: string;

  /**
   * @generated from field: optional string memo = 4;
   */
  memo?: string;

  /**
   * @generated from field: optional int32 displayOrder = 5;
   */
  displayOrder?: number;

  constructor(data?: PartialMessage<PostCategoryResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.PostCategoryResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PostCategoryResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PostCategoryResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PostCategoryResponse;

  static equals(a: PostCategoryResponse | PlainMessage<PostCategoryResponse> | undefined, b: PostCategoryResponse | PlainMessage<PostCategoryResponse> | undefined): boolean;
}

/**
 * @generated from message placeNote.GetPostCategoryListResponse
 */
export declare class GetPostCategoryListResponse extends Message<GetPostCategoryListResponse> {
  /**
   * @generated from field: repeated placeNote.PostCategoryResponse categoryList = 1;
   */
  categoryList: PostCategoryResponse[];

  constructor(data?: PartialMessage<GetPostCategoryListResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.GetPostCategoryListResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostCategoryListResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostCategoryListResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostCategoryListResponse;

  static equals(a: GetPostCategoryListResponse | PlainMessage<GetPostCategoryListResponse> | undefined, b: GetPostCategoryListResponse | PlainMessage<GetPostCategoryListResponse> | undefined): boolean;
}
