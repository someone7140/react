// @generated by protoc-gen-connect-query v0.4.1 with parameter "target=js+dts"
// @generated from file placeNotePostCategoryService.proto (package placeNote, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { createQueryService } from "@bufbuild/connect-query";
import { Empty, MethodKind } from "@bufbuild/protobuf";
import { AddPostCategoryRequest, DeletePostCategoryRequest, GetPostCategoryByIdRequest, GetPostCategoryListResponse, PostCategoryResponse, UpdatePostCategoryRequest } from "./placeNotePostCategoryService_pb.js";

export const typeName = "placeNote.PostCategoryService";

/**
 * @generated from rpc placeNote.PostCategoryService.AddPostCategory
 */
export const addPostCategory = createQueryService({
  service: {
    methods: {
      addPostCategory: {
        name: "AddPostCategory",
        kind: MethodKind.Unary,
        I: AddPostCategoryRequest,
        O: Empty,
      },
    },
    typeName: "placeNote.PostCategoryService",
  },
}).addPostCategory;

/**
 * @generated from rpc placeNote.PostCategoryService.UpdatePostCategory
 */
export const updatePostCategory = createQueryService({
  service: {
    methods: {
      updatePostCategory: {
        name: "UpdatePostCategory",
        kind: MethodKind.Unary,
        I: UpdatePostCategoryRequest,
        O: Empty,
      },
    },
    typeName: "placeNote.PostCategoryService",
  },
}).updatePostCategory;

/**
 * @generated from rpc placeNote.PostCategoryService.DeletePostCategory
 */
export const deletePostCategory = createQueryService({
  service: {
    methods: {
      deletePostCategory: {
        name: "DeletePostCategory",
        kind: MethodKind.Unary,
        I: DeletePostCategoryRequest,
        O: Empty,
      },
    },
    typeName: "placeNote.PostCategoryService",
  },
}).deletePostCategory;

/**
 * @generated from rpc placeNote.PostCategoryService.GetPostCategoryList
 */
export const getPostCategoryList = createQueryService({
  service: {
    methods: {
      getPostCategoryList: {
        name: "GetPostCategoryList",
        kind: MethodKind.Unary,
        I: Empty,
        O: GetPostCategoryListResponse,
      },
    },
    typeName: "placeNote.PostCategoryService",
  },
}).getPostCategoryList;

/**
 * @generated from rpc placeNote.PostCategoryService.GetPostCategoryById
 */
export const getPostCategoryById = createQueryService({
  service: {
    methods: {
      getPostCategoryById: {
        name: "GetPostCategoryById",
        kind: MethodKind.Unary,
        I: GetPostCategoryByIdRequest,
        O: PostCategoryResponse,
      },
    },
    typeName: "placeNote.PostCategoryService",
  },
}).getPostCategoryById;
