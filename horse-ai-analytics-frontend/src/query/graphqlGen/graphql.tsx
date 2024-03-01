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

export type Mutation = {
  __typename?: 'Mutation';
  validateGoogleAuthCode: FieldWrapper<ValidateGoogleAuthCodeResponse>;
};


export type MutationValidateGoogleAuthCodeArgs = {
  authCode: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  testQuery: FieldWrapper<Scalars['String']['output']>;
};


export type QueryTestQueryArgs = {
  names: Array<Scalars['String']['input']>;
};

export type ValidateGoogleAuthCodeResponse = {
  __typename?: 'ValidateGoogleAuthCodeResponse';
  authToken: FieldWrapper<Scalars['String']['output']>;
};

export type ValidateGoogleAuthCodeMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type ValidateGoogleAuthCodeMutation = { __typename?: 'Mutation', validateGoogleAuthCode: { __typename?: 'ValidateGoogleAuthCodeResponse', authToken: string } };


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