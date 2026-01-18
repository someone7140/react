/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export enum ErrorCode {
  Forbidden = 'FORBIDDEN',
  InternalError = 'INTERNAL_ERROR',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

export type Mutation = {
  __typename?: 'Mutation';
  addNovel: Scalars['Boolean']['output'];
  addUserAccountByGoogleAuth: UserAccountResponse;
  deleteNovel: Scalars['Boolean']['output'];
  deleteNovelContentsById: Scalars['Boolean']['output'];
  deleteNovelContentsByIds: Scalars['Boolean']['output'];
  deleteNovelSettingById: Scalars['Boolean']['output'];
  deleteNovelSettingByIds: Scalars['Boolean']['output'];
  editNovel: Scalars['Boolean']['output'];
  loginByGoogleAuth: UserAccountResponse;
  registerNovelContents: Scalars['Boolean']['output'];
  registerNovelSettings: Scalars['Boolean']['output'];
};


export type MutationAddNovelArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationAddUserAccountByGoogleAuthArgs = {
  name: Scalars['String']['input'];
  registerToken: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};


export type MutationDeleteNovelArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteNovelContentsByIdArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteNovelContentsByIdsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationDeleteNovelSettingByIdArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteNovelSettingByIdsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationEditNovelArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationLoginByGoogleAuthArgs = {
  authCode: Scalars['String']['input'];
};


export type MutationRegisterNovelContentsArgs = {
  inputs: Array<NovelContentsRegisterRequestInput>;
};


export type MutationRegisterNovelSettingsArgs = {
  inputs: Array<NovelSettingRegisterRequestInput>;
};

export type NovelContentsRegisterRequestInput = {
  chapterName: Scalars['String']['input'];
  contents?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  novelId: Scalars['String']['input'];
  parentContentsId?: InputMaybe<Scalars['String']['input']>;
};

export type NovelContentsResponse = {
  __typename?: 'NovelContentsResponse';
  chapterName: Scalars['String']['output'];
  contents?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  novelId: Scalars['String']['output'];
  parentContentsId?: Maybe<Scalars['String']['output']>;
};

export type NovelResponse = {
  __typename?: 'NovelResponse';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type NovelSettingRegisterRequestInput = {
  attributes: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  novelId: Scalars['String']['input'];
  parentSettingId?: InputMaybe<Scalars['String']['input']>;
};

export type NovelSettingResponse = {
  __typename?: 'NovelSettingResponse';
  attributes: Array<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  novelId: Scalars['String']['output'];
  parentSettingId?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  myNovelById: NovelResponse;
  myNovels: Array<NovelResponse>;
  novelContentsByNovelId: Array<NovelContentsResponse>;
  novelSettingsByNovelId: Array<NovelSettingResponse>;
  novelSettingsByParentSettingId: Array<NovelSettingResponse>;
  userAccountFromAuthHeader: UserAccountResponse;
  userAccountRegisterTokenFromGoogleAuthCode: Scalars['String']['output'];
};


export type QueryMyNovelByIdArgs = {
  novelId: Scalars['String']['input'];
};


export type QueryNovelContentsByNovelIdArgs = {
  novelId: Scalars['String']['input'];
};


export type QueryNovelSettingsByNovelIdArgs = {
  novelId: Scalars['String']['input'];
};


export type QueryNovelSettingsByParentSettingIdArgs = {
  parentSettingId: Scalars['String']['input'];
};


export type QueryUserAccountRegisterTokenFromGoogleAuthCodeArgs = {
  authCode: Scalars['String']['input'];
};

export type UserAccountResponse = {
  __typename?: 'UserAccountResponse';
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
  userSettingId: Scalars['String']['output'];
};

export type GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type GetUserAccountRegisterTokenFromGoogleAuthCodeQuery = { __typename?: 'Query', userAccountRegisterTokenFromGoogleAuthCode: string };

export type AddUserAccountByGoogleAuthMutationVariables = Exact<{
  registerToken: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type AddUserAccountByGoogleAuthMutation = { __typename?: 'Mutation', addUserAccountByGoogleAuth: { __typename?: 'UserAccountResponse', token?: string | null, userSettingId: string, name: string, imageUrl?: string | null } };

export type GetUserAccountFromAuthHeaderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserAccountFromAuthHeaderQuery = { __typename?: 'Query', userAccountFromAuthHeader: { __typename?: 'UserAccountResponse', token?: string | null, userSettingId: string, name: string, imageUrl?: string | null } };

export type LoginByGoogleAuthMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type LoginByGoogleAuthMutation = { __typename?: 'Mutation', loginByGoogleAuth: { __typename?: 'UserAccountResponse', token?: string | null, userSettingId: string, name: string, imageUrl?: string | null } };

export type GetNovelContentsQueryVariables = Exact<{
  novelId: Scalars['String']['input'];
}>;


export type GetNovelContentsQuery = { __typename?: 'Query', myNovelById: { __typename?: 'NovelResponse', id: string, title: string, description?: string | null }, novelContentsByNovelId: Array<{ __typename?: 'NovelContentsResponse', id: string, chapterName: string, novelId: string, parentContentsId?: string | null, displayOrder?: number | null, contents?: string | null, description?: string | null }> };

export type RegisterNovelContentsMutationVariables = Exact<{
  inputs: Array<NovelContentsRegisterRequestInput> | NovelContentsRegisterRequestInput;
}>;


export type RegisterNovelContentsMutation = { __typename?: 'Mutation', registerNovelContents: boolean };

export type DeleteNovelContentsByIdMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteNovelContentsByIdMutation = { __typename?: 'Mutation', deleteNovelContentsById: boolean };

export type DeleteNovelContentsByIdsMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DeleteNovelContentsByIdsMutation = { __typename?: 'Mutation', deleteNovelContentsByIds: boolean };

export type GetMyNovelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyNovelsQuery = { __typename?: 'Query', myNovels: Array<{ __typename?: 'NovelResponse', id: string, title: string, description?: string | null }> };

export type AddNovelMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddNovelMutation = { __typename?: 'Mutation', addNovel: boolean };

export type EditNovelMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditNovelMutation = { __typename?: 'Mutation', editNovel: boolean };

export type DeleteNovelMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteNovelMutation = { __typename?: 'Mutation', deleteNovel: boolean };

export type GetNovelSettingsQueryVariables = Exact<{
  novelId: Scalars['String']['input'];
}>;


export type GetNovelSettingsQuery = { __typename?: 'Query', myNovelById: { __typename?: 'NovelResponse', id: string, title: string, description?: string | null }, novelSettingsByNovelId: Array<{ __typename?: 'NovelSettingResponse', id: string, name: string, novelId: string, parentSettingId?: string | null, displayOrder?: number | null, attributes: Array<string>, description?: string | null }> };

export type RegisterNovelSettingsMutationVariables = Exact<{
  inputs: Array<NovelSettingRegisterRequestInput> | NovelSettingRegisterRequestInput;
}>;


export type RegisterNovelSettingsMutation = { __typename?: 'Mutation', registerNovelSettings: boolean };

export type DeleteNovelSettingByIdMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteNovelSettingByIdMutation = { __typename?: 'Mutation', deleteNovelSettingById: boolean };

export type DeleteNovelSettingsByIdsMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DeleteNovelSettingsByIdsMutation = { __typename?: 'Mutation', deleteNovelSettingByIds: boolean };

export type GetNovelSettingsByParentSettingIdQueryVariables = Exact<{
  parentSettingId: Scalars['String']['input'];
}>;


export type GetNovelSettingsByParentSettingIdQuery = { __typename?: 'Query', novelSettingsByParentSettingId: Array<{ __typename?: 'NovelSettingResponse', id: string, name: string, novelId: string, parentSettingId?: string | null, displayOrder?: number | null, attributes: Array<string>, description?: string | null }> };


export const GetUserAccountRegisterTokenFromGoogleAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserAccountRegisterTokenFromGoogleAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAccountRegisterTokenFromGoogleAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}]}]}}]} as unknown as DocumentNode<GetUserAccountRegisterTokenFromGoogleAuthCodeQuery, GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables>;
export const AddUserAccountByGoogleAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUserAccountByGoogleAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSettingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUserAccountByGoogleAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"userSettingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSettingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<AddUserAccountByGoogleAuthMutation, AddUserAccountByGoogleAuthMutationVariables>;
export const GetUserAccountFromAuthHeaderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserAccountFromAuthHeader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAccountFromAuthHeader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetUserAccountFromAuthHeaderQuery, GetUserAccountFromAuthHeaderQueryVariables>;
export const LoginByGoogleAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginByGoogleAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginByGoogleAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<LoginByGoogleAuthMutation, LoginByGoogleAuthMutationVariables>;
export const GetNovelContentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNovelContents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNovelById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"novelContentsByNovelId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chapterName"}},{"kind":"Field","name":{"kind":"Name","value":"novelId"}},{"kind":"Field","name":{"kind":"Name","value":"parentContentsId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetNovelContentsQuery, GetNovelContentsQueryVariables>;
export const RegisterNovelContentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterNovelContents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NovelContentsRegisterRequestInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerNovelContents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}}}]}]}}]} as unknown as DocumentNode<RegisterNovelContentsMutation, RegisterNovelContentsMutationVariables>;
export const DeleteNovelContentsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNovelContentsById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNovelContentsById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteNovelContentsByIdMutation, DeleteNovelContentsByIdMutationVariables>;
export const DeleteNovelContentsByIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNovelContentsByIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNovelContentsByIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteNovelContentsByIdsMutation, DeleteNovelContentsByIdsMutationVariables>;
export const GetMyNovelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyNovels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNovels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetMyNovelsQuery, GetMyNovelsQueryVariables>;
export const AddNovelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddNovel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}]}}]} as unknown as DocumentNode<AddNovelMutation, AddNovelMutationVariables>;
export const EditNovelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditNovel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}]}}]} as unknown as DocumentNode<EditNovelMutation, EditNovelMutationVariables>;
export const DeleteNovelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNovel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteNovelMutation, DeleteNovelMutationVariables>;
export const GetNovelSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNovelSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNovelById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"novelSettingsByNovelId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"novelId"}},{"kind":"Field","name":{"kind":"Name","value":"parentSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetNovelSettingsQuery, GetNovelSettingsQueryVariables>;
export const RegisterNovelSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterNovelSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NovelSettingRegisterRequestInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerNovelSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}}}]}]}}]} as unknown as DocumentNode<RegisterNovelSettingsMutation, RegisterNovelSettingsMutationVariables>;
export const DeleteNovelSettingByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNovelSettingById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNovelSettingById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteNovelSettingByIdMutation, DeleteNovelSettingByIdMutationVariables>;
export const DeleteNovelSettingsByIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNovelSettingsByIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNovelSettingByIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteNovelSettingsByIdsMutation, DeleteNovelSettingsByIdsMutationVariables>;
export const GetNovelSettingsByParentSettingIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNovelSettingsByParentSettingId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentSettingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"novelSettingsByParentSettingId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"parentSettingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentSettingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"novelId"}},{"kind":"Field","name":{"kind":"Name","value":"parentSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetNovelSettingsByParentSettingIdQuery, GetNovelSettingsByParentSettingIdQueryVariables>;