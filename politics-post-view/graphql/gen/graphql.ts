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
  loginByGoogle?: Maybe<UserAccountAuthResponse>;
  registerPost?: Maybe<Scalars['Boolean']['output']>;
  registerUserAccountFromGoogle?: Maybe<UserAccountAuthResponse>;
};


export type MutationLoginByGoogleArgs = {
  authCode: Scalars['String']['input'];
};


export type MutationRegisterPostArgs = {
  contents: Scalars['String']['input'];
  openFlag: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};


export type MutationRegisterUserAccountFromGoogleArgs = {
  detail?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  token: Scalars['String']['input'];
  urlList: Array<Scalars['String']['input']>;
  userSettingId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getUserAccountRegisterTokenFromGoogleAuthCode?: Maybe<UserAccountRegisterTokenFromGoogleResponse>;
  getUserInfoFromAuthHeader?: Maybe<UserAccountAuthResponse>;
};


export type QueryGetUserAccountRegisterTokenFromGoogleAuthCodeArgs = {
  authCode: Scalars['String']['input'];
};

export type UserAccountAuthResponse = {
  __typename?: 'UserAccountAuthResponse';
  authToken: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  userSettingId: Scalars['String']['output'];
};

export type UserAccountRegisterTokenFromGoogleResponse = {
  __typename?: 'UserAccountRegisterTokenFromGoogleResponse';
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type GetUserAccountRegisterTokenFromGoogleAuthCodeQuery = { __typename?: 'Query', getUserAccountRegisterTokenFromGoogleAuthCode?: { __typename?: 'UserAccountRegisterTokenFromGoogleResponse', token: string, name: string, imageUrl?: string | null } | null };


export const GetUserAccountRegisterTokenFromGoogleAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserAccountRegisterTokenFromGoogleAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserAccountRegisterTokenFromGoogleAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetUserAccountRegisterTokenFromGoogleAuthCodeQuery, GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables>;