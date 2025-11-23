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

export type Mutation = {
  __typename?: 'Mutation';
  addNovel?: Maybe<Scalars['Boolean']['output']>;
  addUserAccountByGoogleAuth?: Maybe<UserAccountResponse>;
  deleteNovel?: Maybe<Scalars['Boolean']['output']>;
  deleteNovelSettingById?: Maybe<Scalars['Boolean']['output']>;
  deleteNovelSettingByIds?: Maybe<Scalars['Boolean']['output']>;
  editNovel?: Maybe<Scalars['Boolean']['output']>;
  editUserAccount?: Maybe<UserAccountResponse>;
  loginByGoogleAuth?: Maybe<UserAccountResponse>;
  registerNovelSettings?: Maybe<Scalars['Boolean']['output']>;
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


export type MutationEditUserAccountArgs = {
  name: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};


export type MutationLoginByGoogleAuthArgs = {
  authCode: Scalars['String']['input'];
};


export type MutationRegisterNovelSettingsArgs = {
  inputs: Array<NovelSettingRegisterInput>;
};

export type NovelResponse = {
  __typename?: 'NovelResponse';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type NovelSettingRegisterInput = {
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
  getMyNovelById?: Maybe<NovelResponse>;
  getMyNovels: Array<NovelResponse>;
  getNovelSettingsByNovelId: Array<NovelSettingResponse>;
  getNovelSettingsByParentSettingId: Array<NovelSettingResponse>;
  getUserAccountFromAuthHeader?: Maybe<UserAccountResponse>;
  getUserAccountRegisterTokenFromGoogleAuthCode?: Maybe<Scalars['String']['output']>;
};


export type QueryGetMyNovelByIdArgs = {
  novelId: Scalars['String']['input'];
};


export type QueryGetNovelSettingsByNovelIdArgs = {
  novelId: Scalars['String']['input'];
};


export type QueryGetNovelSettingsByParentSettingIdArgs = {
  parentId: Scalars['String']['input'];
};


export type QueryGetUserAccountRegisterTokenFromGoogleAuthCodeArgs = {
  authCode: Scalars['String']['input'];
};

export type UserAccountResponse = {
  __typename?: 'UserAccountResponse';
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  token: Scalars['String']['output'];
  userSettingId: Scalars['String']['output'];
};

export type GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type GetUserAccountRegisterTokenFromGoogleAuthCodeQuery = { __typename?: 'Query', getUserAccountRegisterTokenFromGoogleAuthCode?: string | null };

export type AddUserAccountByGoogleAuthMutationVariables = Exact<{
  registerToken: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type AddUserAccountByGoogleAuthMutation = { __typename?: 'Mutation', addUserAccountByGoogleAuth?: { __typename?: 'UserAccountResponse', token: string, userSettingId: string, name: string, imageUrl: string } | null };

export type GetUserAccountFromAuthHeaderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserAccountFromAuthHeaderQuery = { __typename?: 'Query', getUserAccountFromAuthHeader?: { __typename?: 'UserAccountResponse', token: string, userSettingId: string, name: string, imageUrl: string } | null };

export type LoginByGoogleAuthMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type LoginByGoogleAuthMutation = { __typename?: 'Mutation', loginByGoogleAuth?: { __typename?: 'UserAccountResponse', token: string, userSettingId: string, name: string, imageUrl: string } | null };

export type GetMyNovelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyNovelsQuery = { __typename?: 'Query', getMyNovels: Array<{ __typename?: 'NovelResponse', id: string, title: string, description?: string | null }> };

export type AddNovelMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddNovelMutation = { __typename?: 'Mutation', addNovel?: boolean | null };

export type EditNovelMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditNovelMutation = { __typename?: 'Mutation', editNovel?: boolean | null };

export type DeleteNovelMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteNovelMutation = { __typename?: 'Mutation', deleteNovel?: boolean | null };

export type GetNovelSettingsQueryVariables = Exact<{
  novelId: Scalars['String']['input'];
}>;


export type GetNovelSettingsQuery = { __typename?: 'Query', getMyNovelById?: { __typename?: 'NovelResponse', id: string, title: string, description?: string | null } | null, getNovelSettingsByNovelId: Array<{ __typename?: 'NovelSettingResponse', id: string, name: string, novelId: string, parentSettingId?: string | null, displayOrder?: number | null, attributes: Array<string>, description?: string | null }> };

export type RegisterNovelSettingsMutationVariables = Exact<{
  inputs: Array<NovelSettingRegisterInput> | NovelSettingRegisterInput;
}>;


export type RegisterNovelSettingsMutation = { __typename?: 'Mutation', registerNovelSettings?: boolean | null };

export type DeleteNovelSettingByIdMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteNovelSettingByIdMutation = { __typename?: 'Mutation', deleteNovelSettingById?: boolean | null };

export type DeleteNovelSettingsByIdsMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DeleteNovelSettingsByIdsMutation = { __typename?: 'Mutation', deleteNovelSettingByIds?: boolean | null };

export type GetNovelSettingsByParentSettingIdQueryVariables = Exact<{
  parentSettingId: Scalars['String']['input'];
}>;


export type GetNovelSettingsByParentSettingIdQuery = { __typename?: 'Query', getNovelSettingsByParentSettingId: Array<{ __typename?: 'NovelSettingResponse', id: string, name: string, novelId: string, parentSettingId?: string | null, displayOrder?: number | null, attributes: Array<string>, description?: string | null }> };


export const GetUserAccountRegisterTokenFromGoogleAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserAccountRegisterTokenFromGoogleAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserAccountRegisterTokenFromGoogleAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}]}]}}]} as unknown as DocumentNode<GetUserAccountRegisterTokenFromGoogleAuthCodeQuery, GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables>;
export const AddUserAccountByGoogleAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUserAccountByGoogleAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSettingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUserAccountByGoogleAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"userSettingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSettingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<AddUserAccountByGoogleAuthMutation, AddUserAccountByGoogleAuthMutationVariables>;
export const GetUserAccountFromAuthHeaderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserAccountFromAuthHeader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserAccountFromAuthHeader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetUserAccountFromAuthHeaderQuery, GetUserAccountFromAuthHeaderQueryVariables>;
export const LoginByGoogleAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginByGoogleAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginByGoogleAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<LoginByGoogleAuthMutation, LoginByGoogleAuthMutationVariables>;
export const GetMyNovelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyNovels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyNovels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetMyNovelsQuery, GetMyNovelsQueryVariables>;
export const AddNovelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddNovel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}]}}]} as unknown as DocumentNode<AddNovelMutation, AddNovelMutationVariables>;
export const EditNovelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditNovel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}]}}]} as unknown as DocumentNode<EditNovelMutation, EditNovelMutationVariables>;
export const DeleteNovelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNovel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteNovelMutation, DeleteNovelMutationVariables>;
export const GetNovelSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNovelSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyNovelById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getNovelSettingsByNovelId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"novelId"}},{"kind":"Field","name":{"kind":"Name","value":"parentSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetNovelSettingsQuery, GetNovelSettingsQueryVariables>;
export const RegisterNovelSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterNovelSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NovelSettingRegisterInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerNovelSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}}}]}]}}]} as unknown as DocumentNode<RegisterNovelSettingsMutation, RegisterNovelSettingsMutationVariables>;
export const DeleteNovelSettingByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNovelSettingById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNovelSettingById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteNovelSettingByIdMutation, DeleteNovelSettingByIdMutationVariables>;
export const DeleteNovelSettingsByIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNovelSettingsByIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNovelSettingByIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteNovelSettingsByIdsMutation, DeleteNovelSettingsByIdsMutationVariables>;
export const GetNovelSettingsByParentSettingIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNovelSettingsByParentSettingId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentSettingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNovelSettingsByParentSettingId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentSettingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"novelId"}},{"kind":"Field","name":{"kind":"Name","value":"parentSettingId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetNovelSettingsByParentSettingIdQuery, GetNovelSettingsByParentSettingIdQueryVariables>;