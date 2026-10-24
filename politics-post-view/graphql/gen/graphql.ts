/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ErrorType =
  | 'AUTH_ERROR'
  | 'BAD_REQUEST'
  | 'FORBIDDEN_ERROR'
  | 'NOT_FOUND';

export type PostStatus =
  | 'DRAFT'
  | 'OPEN'
  | 'PRIVATE';

export type UserAccountAuthResponseFragment = { authToken: string, name: string, userSettingId: string, imageUrl: string | null, urlList: Array<string>, detail: string | null };

export type GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables = Exact<{
  authCode: string;
}>;


export type GetUserAccountRegisterTokenFromGoogleAuthCodeQuery = { getUserAccountRegisterTokenFromGoogleAuthCode: { token: string, name: string, imageUrl: string | null } | null };

export type GetUserInfoFromAuthHeaderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoFromAuthHeaderQuery = { getUserInfoFromAuthHeader: { authToken: string, name: string, userSettingId: string, imageUrl: string | null, urlList: Array<string>, detail: string | null } | null };

export type RegisterUserAccountFromGoogleMutationVariables = Exact<{
  token: string;
  name: string;
  userSettingId: string;
  urlList: Array<string> | string;
  detail?: string | null | undefined;
}>;


export type RegisterUserAccountFromGoogleMutation = { registerUserAccountFromGoogle: { authToken: string, name: string, userSettingId: string, imageUrl: string | null, urlList: Array<string>, detail: string | null } | null };

export type LoginByGoogleMutationVariables = Exact<{
  authCode: string;
}>;


export type LoginByGoogleMutation = { loginByGoogle: { authToken: string, name: string, userSettingId: string, imageUrl: string | null, urlList: Array<string>, detail: string | null } | null };

export type ErrorTypeDummyQueryVariables = Exact<{ [key: string]: never; }>;


export type ErrorTypeDummyQuery = { errorTypeDummy: ErrorType | null };

export type PostResponseFragment = { id: string, title: string, contents: string, status: PostStatus, description: string | null, updateAt: Date, commitAt: Date | null, tags: Array<{ id: string, tagName: string }>, userAccount: { userSettingId: string, name: string, imageUrl: string | null } };

export type RegisterPostMutationVariables = Exact<{
  title: string;
  contents: string;
  status: PostStatus;
  tagNames: Array<string> | string;
  description?: string | null | undefined;
}>;


export type RegisterPostMutation = { registerPost: boolean | null };

export type GetMyPostsQueryVariables = Exact<{
  status?: PostStatus | null | undefined;
  id?: string | null | undefined;
}>;


export type GetMyPostsQuery = { getMyPosts: Array<{ id: string, title: string, contents: string, status: PostStatus, description: string | null, updateAt: Date, commitAt: Date | null, tags: Array<{ id: string, tagName: string }>, userAccount: { userSettingId: string, name: string, imageUrl: string | null } }> | null };

export type GetPostTagsQueryVariables = Exact<{
  keyword: string;
  isOpenOnly: boolean;
}>;


export type GetPostTagsQuery = { getPostTags: Array<{ id: string, tagName: string }> | null };

export const UserAccountAuthResponseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAccountAuthResponse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAccountAuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"urlList"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}}]}}]} as unknown as DocumentNode<UserAccountAuthResponseFragment, unknown>;
export const PostResponseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostResponse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tagName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commitAt"}}]}}]} as unknown as DocumentNode<PostResponseFragment, unknown>;
export const GetUserAccountRegisterTokenFromGoogleAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserAccountRegisterTokenFromGoogleAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserAccountRegisterTokenFromGoogleAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetUserAccountRegisterTokenFromGoogleAuthCodeQuery, GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables>;
export const GetUserInfoFromAuthHeaderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserInfoFromAuthHeader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserInfoFromAuthHeader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserAccountAuthResponse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAccountAuthResponse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAccountAuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"urlList"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}}]}}]} as unknown as DocumentNode<GetUserInfoFromAuthHeaderQuery, GetUserInfoFromAuthHeaderQueryVariables>;
export const RegisterUserAccountFromGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUserAccountFromGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSettingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"urlList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"detail"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUserAccountFromGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"userSettingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSettingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"urlList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"urlList"}}},{"kind":"Argument","name":{"kind":"Name","value":"detail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"detail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserAccountAuthResponse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAccountAuthResponse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAccountAuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"urlList"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}}]}}]} as unknown as DocumentNode<RegisterUserAccountFromGoogleMutation, RegisterUserAccountFromGoogleMutationVariables>;
export const LoginByGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginByGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginByGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserAccountAuthResponse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAccountAuthResponse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAccountAuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"urlList"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}}]}}]} as unknown as DocumentNode<LoginByGoogleMutation, LoginByGoogleMutationVariables>;
export const ErrorTypeDummyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ErrorTypeDummy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorTypeDummy"}}]}}]} as unknown as DocumentNode<ErrorTypeDummyQuery, ErrorTypeDummyQueryVariables>;
export const RegisterPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contents"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagNames"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contents"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"tagNames"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagNames"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}]}}]} as unknown as DocumentNode<RegisterPostMutation, RegisterPostMutationVariables>;
export const GetMyPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PostStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostResponse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostResponse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tagName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commitAt"}}]}}]} as unknown as DocumentNode<GetMyPostsQuery, GetMyPostsQueryVariables>;
export const GetPostTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isOpenOnly"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"isOpenOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isOpenOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tagName"}}]}}]}}]} as unknown as DocumentNode<GetPostTagsQuery, GetPostTagsQueryVariables>;