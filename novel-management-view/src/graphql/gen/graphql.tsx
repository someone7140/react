import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type FieldWrapper<T> = T;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  addNovel: FieldWrapper<Scalars['Boolean']['output']>;
  addUserAccountByGoogleAuth: FieldWrapper<UserAccountResponse>;
  deleteNovel: FieldWrapper<Scalars['Boolean']['output']>;
  editNovel: FieldWrapper<Scalars['Boolean']['output']>;
  editUserAccount: FieldWrapper<UserAccountResponse>;
  loginByGoogleAuth: FieldWrapper<UserAccountResponse>;
};


export type MutationRootAddNovelArgs = {
  title: Scalars['String']['input'];
};


export type MutationRootAddUserAccountByGoogleAuthArgs = {
  name: Scalars['String']['input'];
  registerToken: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};


export type MutationRootDeleteNovelArgs = {
  id: Scalars['String']['input'];
};


export type MutationRootEditNovelArgs = {
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationRootEditUserAccountArgs = {
  name: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};


export type MutationRootLoginByGoogleAuthArgs = {
  authCode: Scalars['String']['input'];
};

export type NovelResponse = {
  __typename?: 'NovelResponse';
  id: FieldWrapper<Scalars['String']['output']>;
  title: FieldWrapper<Scalars['String']['output']>;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  getMyNovels: Array<FieldWrapper<NovelResponse>>;
  getUserAccountFromAuthHeaderUserAccountId: FieldWrapper<UserAccountResponse>;
  getUserAccountRegisterTokenFromGoogleAuthCode: FieldWrapper<RegisterTokenFromGoogleAuthCodeResponse>;
};


export type QueryRootGetUserAccountRegisterTokenFromGoogleAuthCodeArgs = {
  authCode: Scalars['String']['input'];
};

export type RegisterTokenFromGoogleAuthCodeResponse = {
  __typename?: 'RegisterTokenFromGoogleAuthCodeResponse';
  registerToken: FieldWrapper<Scalars['String']['output']>;
};

export type UserAccountResponse = {
  __typename?: 'UserAccountResponse';
  imageUrl?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  name: FieldWrapper<Scalars['String']['output']>;
  token: FieldWrapper<Scalars['String']['output']>;
  userSettingId: FieldWrapper<Scalars['String']['output']>;
};

export type GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type GetUserAccountRegisterTokenFromGoogleAuthCodeQuery = { __typename?: 'QueryRoot', getUserAccountRegisterTokenFromGoogleAuthCode: { __typename?: 'RegisterTokenFromGoogleAuthCodeResponse', registerToken: string } };


export const GetUserAccountRegisterTokenFromGoogleAuthCodeDocument = gql`
    query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {
  getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {
    registerToken
  }
}
    `;

/**
 * __useGetUserAccountRegisterTokenFromGoogleAuthCodeQuery__
 *
 * To run a query within a React component, call `useGetUserAccountRegisterTokenFromGoogleAuthCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAccountRegisterTokenFromGoogleAuthCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAccountRegisterTokenFromGoogleAuthCodeQuery({
 *   variables: {
 *      authCode: // value for 'authCode'
 *   },
 * });
 */
export function useGetUserAccountRegisterTokenFromGoogleAuthCodeQuery(baseOptions: Apollo.QueryHookOptions<GetUserAccountRegisterTokenFromGoogleAuthCodeQuery, GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables> & ({ variables: GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAccountRegisterTokenFromGoogleAuthCodeQuery, GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables>(GetUserAccountRegisterTokenFromGoogleAuthCodeDocument, options);
      }
export function useGetUserAccountRegisterTokenFromGoogleAuthCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAccountRegisterTokenFromGoogleAuthCodeQuery, GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAccountRegisterTokenFromGoogleAuthCodeQuery, GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables>(GetUserAccountRegisterTokenFromGoogleAuthCodeDocument, options);
        }
export function useGetUserAccountRegisterTokenFromGoogleAuthCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserAccountRegisterTokenFromGoogleAuthCodeQuery, GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserAccountRegisterTokenFromGoogleAuthCodeQuery, GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables>(GetUserAccountRegisterTokenFromGoogleAuthCodeDocument, options);
        }
export type GetUserAccountRegisterTokenFromGoogleAuthCodeQueryHookResult = ReturnType<typeof useGetUserAccountRegisterTokenFromGoogleAuthCodeQuery>;
export type GetUserAccountRegisterTokenFromGoogleAuthCodeLazyQueryHookResult = ReturnType<typeof useGetUserAccountRegisterTokenFromGoogleAuthCodeLazyQuery>;
export type GetUserAccountRegisterTokenFromGoogleAuthCodeSuspenseQueryHookResult = ReturnType<typeof useGetUserAccountRegisterTokenFromGoogleAuthCodeSuspenseQuery>;
export type GetUserAccountRegisterTokenFromGoogleAuthCodeQueryResult = Apollo.QueryResult<GetUserAccountRegisterTokenFromGoogleAuthCodeQuery, GetUserAccountRegisterTokenFromGoogleAuthCodeQueryVariables>;