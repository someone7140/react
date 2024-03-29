// @generated by protoc-gen-es v1.4.1 with parameter "target=js+dts"
// @generated from file placeNoteUserAccountService.proto (package placeNote, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum placeNote.AuthMethod
 */
export declare enum AuthMethod {
  /**
   * @generated from enum value: UNKNOWN = 0;
   */
  UNKNOWN = 0,

  /**
   * @generated from enum value: GOOGLE = 1;
   */
  GOOGLE = 1,

  /**
   * @generated from enum value: EMAIL = 2;
   */
  EMAIL = 2,
}

/**
 * @generated from message placeNote.AuthGoogleAccountRequest
 */
export declare class AuthGoogleAccountRequest extends Message<AuthGoogleAccountRequest> {
  /**
   * @generated from field: string authCode = 1;
   */
  authCode: string;

  constructor(data?: PartialMessage<AuthGoogleAccountRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.AuthGoogleAccountRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AuthGoogleAccountRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AuthGoogleAccountRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AuthGoogleAccountRequest;

  static equals(a: AuthGoogleAccountRequest | PlainMessage<AuthGoogleAccountRequest> | undefined, b: AuthGoogleAccountRequest | PlainMessage<AuthGoogleAccountRequest> | undefined): boolean;
}

/**
 * @generated from message placeNote.AuthGoogleAccountResponse
 */
export declare class AuthGoogleAccountResponse extends Message<AuthGoogleAccountResponse> {
  /**
   * @generated from field: string token = 1;
   */
  token: string;

  constructor(data?: PartialMessage<AuthGoogleAccountResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.AuthGoogleAccountResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AuthGoogleAccountResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AuthGoogleAccountResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AuthGoogleAccountResponse;

  static equals(a: AuthGoogleAccountResponse | PlainMessage<AuthGoogleAccountResponse> | undefined, b: AuthGoogleAccountResponse | PlainMessage<AuthGoogleAccountResponse> | undefined): boolean;
}

/**
 * @generated from message placeNote.RegisterUserAccountRequest
 */
export declare class RegisterUserAccountRequest extends Message<RegisterUserAccountRequest> {
  /**
   * @generated from field: string authToken = 1;
   */
  authToken: string;

  /**
   * @generated from field: placeNote.AuthMethod authMethod = 2;
   */
  authMethod: AuthMethod;

  /**
   * @generated from field: string userSettingId = 3;
   */
  userSettingId: string;

  /**
   * @generated from field: string name = 4;
   */
  name: string;

  constructor(data?: PartialMessage<RegisterUserAccountRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.RegisterUserAccountRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RegisterUserAccountRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RegisterUserAccountRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RegisterUserAccountRequest;

  static equals(a: RegisterUserAccountRequest | PlainMessage<RegisterUserAccountRequest> | undefined, b: RegisterUserAccountRequest | PlainMessage<RegisterUserAccountRequest> | undefined): boolean;
}

/**
 * @generated from message placeNote.UserAccountResponse
 */
export declare class UserAccountResponse extends Message<UserAccountResponse> {
  /**
   * @generated from field: string token = 1;
   */
  token: string;

  /**
   * @generated from field: placeNote.AuthMethod authMethod = 2;
   */
  authMethod: AuthMethod;

  /**
   * @generated from field: string userSettingId = 3;
   */
  userSettingId: string;

  /**
   * @generated from field: string name = 4;
   */
  name: string;

  constructor(data?: PartialMessage<UserAccountResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "placeNote.UserAccountResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UserAccountResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UserAccountResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UserAccountResponse;

  static equals(a: UserAccountResponse | PlainMessage<UserAccountResponse> | undefined, b: UserAccountResponse | PlainMessage<UserAccountResponse> | undefined): boolean;
}

