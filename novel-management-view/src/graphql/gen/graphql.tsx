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
  getUserAccountFromAuthHeader: FieldWrapper<UserAccountResponse>;
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

export type AddUserAccountByGoogleAuthMutationVariables = Exact<{
  registerToken: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type AddUserAccountByGoogleAuthMutation = { __typename?: 'MutationRoot', addUserAccountByGoogleAuth: { __typename?: 'UserAccountResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null } };

export type GetUserAccountFromAuthHeaderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserAccountFromAuthHeaderQuery = { __typename?: 'QueryRoot', getUserAccountFromAuthHeader: { __typename?: 'UserAccountResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null } };

export type LoginByGoogleAuthMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type LoginByGoogleAuthMutation = { __typename?: 'MutationRoot', loginByGoogleAuth: { __typename?: 'UserAccountResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null } };


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
export const AddUserAccountByGoogleAuthDocument = gql`
    mutation AddUserAccountByGoogleAuth($registerToken: String!, $userSettingId: String!, $name: String!) {
  addUserAccountByGoogleAuth(
    registerToken: $registerToken
    userSettingId: $userSettingId
    name: $name
  ) {
    token
    userSettingId
    name
    imageUrl
  }
}
    `;
export type AddUserAccountByGoogleAuthMutationFn = Apollo.MutationFunction<AddUserAccountByGoogleAuthMutation, AddUserAccountByGoogleAuthMutationVariables>;

/**
 * __useAddUserAccountByGoogleAuthMutation__
 *
 * To run a mutation, you first call `useAddUserAccountByGoogleAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserAccountByGoogleAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserAccountByGoogleAuthMutation, { data, loading, error }] = useAddUserAccountByGoogleAuthMutation({
 *   variables: {
 *      registerToken: // value for 'registerToken'
 *      userSettingId: // value for 'userSettingId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddUserAccountByGoogleAuthMutation(baseOptions?: Apollo.MutationHookOptions<AddUserAccountByGoogleAuthMutation, AddUserAccountByGoogleAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserAccountByGoogleAuthMutation, AddUserAccountByGoogleAuthMutationVariables>(AddUserAccountByGoogleAuthDocument, options);
      }
export type AddUserAccountByGoogleAuthMutationHookResult = ReturnType<typeof useAddUserAccountByGoogleAuthMutation>;
export type AddUserAccountByGoogleAuthMutationResult = Apollo.MutationResult<AddUserAccountByGoogleAuthMutation>;
export type AddUserAccountByGoogleAuthMutationOptions = Apollo.BaseMutationOptions<AddUserAccountByGoogleAuthMutation, AddUserAccountByGoogleAuthMutationVariables>;
export const GetUserAccountFromAuthHeaderDocument = gql`
    query GetUserAccountFromAuthHeader {
  getUserAccountFromAuthHeader {
    token
    userSettingId
    name
    imageUrl
  }
}
    `;

/**
 * __useGetUserAccountFromAuthHeaderQuery__
 *
 * To run a query within a React component, call `useGetUserAccountFromAuthHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAccountFromAuthHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAccountFromAuthHeaderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserAccountFromAuthHeaderQuery(baseOptions?: Apollo.QueryHookOptions<GetUserAccountFromAuthHeaderQuery, GetUserAccountFromAuthHeaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAccountFromAuthHeaderQuery, GetUserAccountFromAuthHeaderQueryVariables>(GetUserAccountFromAuthHeaderDocument, options);
      }
export function useGetUserAccountFromAuthHeaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAccountFromAuthHeaderQuery, GetUserAccountFromAuthHeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAccountFromAuthHeaderQuery, GetUserAccountFromAuthHeaderQueryVariables>(GetUserAccountFromAuthHeaderDocument, options);
        }
export function useGetUserAccountFromAuthHeaderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserAccountFromAuthHeaderQuery, GetUserAccountFromAuthHeaderQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserAccountFromAuthHeaderQuery, GetUserAccountFromAuthHeaderQueryVariables>(GetUserAccountFromAuthHeaderDocument, options);
        }
export type GetUserAccountFromAuthHeaderQueryHookResult = ReturnType<typeof useGetUserAccountFromAuthHeaderQuery>;
export type GetUserAccountFromAuthHeaderLazyQueryHookResult = ReturnType<typeof useGetUserAccountFromAuthHeaderLazyQuery>;
export type GetUserAccountFromAuthHeaderSuspenseQueryHookResult = ReturnType<typeof useGetUserAccountFromAuthHeaderSuspenseQuery>;
export type GetUserAccountFromAuthHeaderQueryResult = Apollo.QueryResult<GetUserAccountFromAuthHeaderQuery, GetUserAccountFromAuthHeaderQueryVariables>;
export const LoginByGoogleAuthDocument = gql`
    mutation LoginByGoogleAuth($authCode: String!) {
  loginByGoogleAuth(authCode: $authCode) {
    token
    userSettingId
    name
    imageUrl
  }
}
    `;
export type LoginByGoogleAuthMutationFn = Apollo.MutationFunction<LoginByGoogleAuthMutation, LoginByGoogleAuthMutationVariables>;

/**
 * __useLoginByGoogleAuthMutation__
 *
 * To run a mutation, you first call `useLoginByGoogleAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginByGoogleAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginByGoogleAuthMutation, { data, loading, error }] = useLoginByGoogleAuthMutation({
 *   variables: {
 *      authCode: // value for 'authCode'
 *   },
 * });
 */
export function useLoginByGoogleAuthMutation(baseOptions?: Apollo.MutationHookOptions<LoginByGoogleAuthMutation, LoginByGoogleAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginByGoogleAuthMutation, LoginByGoogleAuthMutationVariables>(LoginByGoogleAuthDocument, options);
      }
export type LoginByGoogleAuthMutationHookResult = ReturnType<typeof useLoginByGoogleAuthMutation>;
export type LoginByGoogleAuthMutationResult = Apollo.MutationResult<LoginByGoogleAuthMutation>;
export type LoginByGoogleAuthMutationOptions = Apollo.BaseMutationOptions<LoginByGoogleAuthMutation, LoginByGoogleAuthMutationVariables>;