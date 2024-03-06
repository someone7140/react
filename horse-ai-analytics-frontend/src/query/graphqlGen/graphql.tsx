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

export type AccountUserResponse = {
  __typename?: 'AccountUserResponse';
  authToken?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  name: FieldWrapper<Scalars['String']['output']>;
  userSettingId: FieldWrapper<Scalars['String']['output']>;
};

export type GetRaceInfoResponse = {
  __typename?: 'GetRaceInfoResponse';
  prompt: FieldWrapper<Scalars['String']['output']>;
  raceDateYyyyMmDd: FieldWrapper<Scalars['String']['output']>;
  raceName: FieldWrapper<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccountUserFromGoogle: FieldWrapper<AccountUserResponse>;
  loginGoogleAuthCode: FieldWrapper<AccountUserResponse>;
  validateGoogleAuthCode: FieldWrapper<ValidateGoogleAuthCodeResponse>;
};


export type MutationAddAccountUserFromGoogleArgs = {
  authToken: Scalars['String']['input'];
  name: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};


export type MutationLoginGoogleAuthCodeArgs = {
  authCode: Scalars['String']['input'];
};


export type MutationValidateGoogleAuthCodeArgs = {
  authCode: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getRaceInfoFromUrl: FieldWrapper<GetRaceInfoResponse>;
  getUserFromAuthHeader: FieldWrapper<AccountUserResponse>;
};


export type QueryGetRaceInfoFromUrlArgs = {
  url: Scalars['String']['input'];
};

export type ValidateGoogleAuthCodeResponse = {
  __typename?: 'ValidateGoogleAuthCodeResponse';
  authToken: FieldWrapper<Scalars['String']['output']>;
};

export type LoginGoogleAuthCodeMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type LoginGoogleAuthCodeMutation = { __typename?: 'Mutation', loginGoogleAuthCode: { __typename?: 'AccountUserResponse', authToken?: string | null, userSettingId: string, name: string } };

export type ValidateGoogleAuthCodeMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type ValidateGoogleAuthCodeMutation = { __typename?: 'Mutation', validateGoogleAuthCode: { __typename?: 'ValidateGoogleAuthCodeResponse', authToken: string } };

export type AddAccountUserFromGoogleMutationVariables = Exact<{
  authToken: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type AddAccountUserFromGoogleMutation = { __typename?: 'Mutation', addAccountUserFromGoogle: { __typename?: 'AccountUserResponse', authToken?: string | null, userSettingId: string, name: string } };

export type GetUserFromAuthHeaderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFromAuthHeaderQuery = { __typename?: 'Query', getUserFromAuthHeader: { __typename?: 'AccountUserResponse', authToken?: string | null, userSettingId: string, name: string } };


export const LoginGoogleAuthCodeDocument = gql`
    mutation LoginGoogleAuthCode($authCode: String!) {
  loginGoogleAuthCode(authCode: $authCode) {
    authToken
    userSettingId
    name
  }
}
    `;
export type LoginGoogleAuthCodeMutationFn = Apollo.MutationFunction<LoginGoogleAuthCodeMutation, LoginGoogleAuthCodeMutationVariables>;

/**
 * __useLoginGoogleAuthCodeMutation__
 *
 * To run a mutation, you first call `useLoginGoogleAuthCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginGoogleAuthCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginGoogleAuthCodeMutation, { data, loading, error }] = useLoginGoogleAuthCodeMutation({
 *   variables: {
 *      authCode: // value for 'authCode'
 *   },
 * });
 */
export function useLoginGoogleAuthCodeMutation(baseOptions?: Apollo.MutationHookOptions<LoginGoogleAuthCodeMutation, LoginGoogleAuthCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginGoogleAuthCodeMutation, LoginGoogleAuthCodeMutationVariables>(LoginGoogleAuthCodeDocument, options);
      }
export type LoginGoogleAuthCodeMutationHookResult = ReturnType<typeof useLoginGoogleAuthCodeMutation>;
export type LoginGoogleAuthCodeMutationResult = Apollo.MutationResult<LoginGoogleAuthCodeMutation>;
export type LoginGoogleAuthCodeMutationOptions = Apollo.BaseMutationOptions<LoginGoogleAuthCodeMutation, LoginGoogleAuthCodeMutationVariables>;
export const ValidateGoogleAuthCodeDocument = gql`
    mutation ValidateGoogleAuthCode($authCode: String!) {
  validateGoogleAuthCode(authCode: $authCode) {
    authToken
  }
}
    `;
export type ValidateGoogleAuthCodeMutationFn = Apollo.MutationFunction<ValidateGoogleAuthCodeMutation, ValidateGoogleAuthCodeMutationVariables>;

/**
 * __useValidateGoogleAuthCodeMutation__
 *
 * To run a mutation, you first call `useValidateGoogleAuthCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateGoogleAuthCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateGoogleAuthCodeMutation, { data, loading, error }] = useValidateGoogleAuthCodeMutation({
 *   variables: {
 *      authCode: // value for 'authCode'
 *   },
 * });
 */
export function useValidateGoogleAuthCodeMutation(baseOptions?: Apollo.MutationHookOptions<ValidateGoogleAuthCodeMutation, ValidateGoogleAuthCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateGoogleAuthCodeMutation, ValidateGoogleAuthCodeMutationVariables>(ValidateGoogleAuthCodeDocument, options);
      }
export type ValidateGoogleAuthCodeMutationHookResult = ReturnType<typeof useValidateGoogleAuthCodeMutation>;
export type ValidateGoogleAuthCodeMutationResult = Apollo.MutationResult<ValidateGoogleAuthCodeMutation>;
export type ValidateGoogleAuthCodeMutationOptions = Apollo.BaseMutationOptions<ValidateGoogleAuthCodeMutation, ValidateGoogleAuthCodeMutationVariables>;
export const AddAccountUserFromGoogleDocument = gql`
    mutation AddAccountUserFromGoogle($authToken: String!, $userSettingId: String!, $name: String!) {
  addAccountUserFromGoogle(
    authToken: $authToken
    userSettingId: $userSettingId
    name: $name
  ) {
    authToken
    userSettingId
    name
  }
}
    `;
export type AddAccountUserFromGoogleMutationFn = Apollo.MutationFunction<AddAccountUserFromGoogleMutation, AddAccountUserFromGoogleMutationVariables>;

/**
 * __useAddAccountUserFromGoogleMutation__
 *
 * To run a mutation, you first call `useAddAccountUserFromGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAccountUserFromGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAccountUserFromGoogleMutation, { data, loading, error }] = useAddAccountUserFromGoogleMutation({
 *   variables: {
 *      authToken: // value for 'authToken'
 *      userSettingId: // value for 'userSettingId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddAccountUserFromGoogleMutation(baseOptions?: Apollo.MutationHookOptions<AddAccountUserFromGoogleMutation, AddAccountUserFromGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAccountUserFromGoogleMutation, AddAccountUserFromGoogleMutationVariables>(AddAccountUserFromGoogleDocument, options);
      }
export type AddAccountUserFromGoogleMutationHookResult = ReturnType<typeof useAddAccountUserFromGoogleMutation>;
export type AddAccountUserFromGoogleMutationResult = Apollo.MutationResult<AddAccountUserFromGoogleMutation>;
export type AddAccountUserFromGoogleMutationOptions = Apollo.BaseMutationOptions<AddAccountUserFromGoogleMutation, AddAccountUserFromGoogleMutationVariables>;
export const GetUserFromAuthHeaderDocument = gql`
    query GetUserFromAuthHeader {
  getUserFromAuthHeader {
    authToken
    userSettingId
    name
  }
}
    `;

/**
 * __useGetUserFromAuthHeaderQuery__
 *
 * To run a query within a React component, call `useGetUserFromAuthHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFromAuthHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFromAuthHeaderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserFromAuthHeaderQuery(baseOptions?: Apollo.QueryHookOptions<GetUserFromAuthHeaderQuery, GetUserFromAuthHeaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFromAuthHeaderQuery, GetUserFromAuthHeaderQueryVariables>(GetUserFromAuthHeaderDocument, options);
      }
export function useGetUserFromAuthHeaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFromAuthHeaderQuery, GetUserFromAuthHeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFromAuthHeaderQuery, GetUserFromAuthHeaderQueryVariables>(GetUserFromAuthHeaderDocument, options);
        }
export function useGetUserFromAuthHeaderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserFromAuthHeaderQuery, GetUserFromAuthHeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFromAuthHeaderQuery, GetUserFromAuthHeaderQueryVariables>(GetUserFromAuthHeaderDocument, options);
        }
export type GetUserFromAuthHeaderQueryHookResult = ReturnType<typeof useGetUserFromAuthHeaderQuery>;
export type GetUserFromAuthHeaderLazyQueryHookResult = ReturnType<typeof useGetUserFromAuthHeaderLazyQuery>;
export type GetUserFromAuthHeaderSuspenseQueryHookResult = ReturnType<typeof useGetUserFromAuthHeaderSuspenseQuery>;
export type GetUserFromAuthHeaderQueryResult = Apollo.QueryResult<GetUserFromAuthHeaderQuery, GetUserFromAuthHeaderQueryVariables>;