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
  DateTime: { input: Date; output: Date; }
  Upload: { input: File; output: File; }
};

export type AccountUserResponse = {
  __typename?: 'AccountUserResponse';
  imageUrl?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  name: FieldWrapper<Scalars['String']['output']>;
  token: FieldWrapper<Scalars['String']['output']>;
  userSettingId: FieldWrapper<Scalars['String']['output']>;
};

export type GoogleAuthCodeVerifyResponse = {
  __typename?: 'GoogleAuthCodeVerifyResponse';
  token: FieldWrapper<Scalars['String']['output']>;
};

export type LatLonInput = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
};

export type LatLonResponse = {
  __typename?: 'LatLonResponse';
  lat: FieldWrapper<Scalars['Float']['output']>;
  lon: FieldWrapper<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccountUserByGoogle: FieldWrapper<AccountUserResponse>;
  addPost: FieldWrapper<Scalars['Boolean']['output']>;
  addPostCategory: FieldWrapper<Scalars['Boolean']['output']>;
  addPostPlace: FieldWrapper<Scalars['String']['output']>;
  deletePostCategory: FieldWrapper<Scalars['Boolean']['output']>;
  deletePostPlace: FieldWrapper<Scalars['Boolean']['output']>;
  editAccountUser: FieldWrapper<AccountUserResponse>;
  editPostCategory: FieldWrapper<Scalars['Boolean']['output']>;
  editPostPlace: FieldWrapper<Scalars['Boolean']['output']>;
  googleAuthCodeVerify: FieldWrapper<GoogleAuthCodeVerifyResponse>;
  loginByGoogleAuthCode: FieldWrapper<AccountUserResponse>;
};


export type MutationAddAccountUserByGoogleArgs = {
  authToken: Scalars['String']['input'];
  imageFile?: InputMaybe<Scalars['Upload']['input']>;
  name: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};


export type MutationAddPostArgs = {
  categoryIdList: Array<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  isOpen: Scalars['Boolean']['input'];
  placeId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  urlList: Array<Scalars['String']['input']>;
  visitedDate: Scalars['DateTime']['input'];
};


export type MutationAddPostCategoryArgs = {
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddPostPlaceArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  categoryIdList: Array<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  latLon?: InputMaybe<LatLonInput>;
  name: Scalars['String']['input'];
  prefectureCode?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeletePostCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePostPlaceArgs = {
  id: Scalars['String']['input'];
};


export type MutationEditAccountUserArgs = {
  imageFile?: InputMaybe<Scalars['Upload']['input']>;
  name: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};


export type MutationEditPostCategoryArgs = {
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  memo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditPostPlaceArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  categoryIdList: Array<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  latLon?: InputMaybe<LatLonInput>;
  name: Scalars['String']['input'];
  prefectureCode?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGoogleAuthCodeVerifyArgs = {
  authCode: Scalars['String']['input'];
};


export type MutationLoginByGoogleAuthCodeArgs = {
  authCode: Scalars['String']['input'];
};

export type PostCategoryResponse = {
  __typename?: 'PostCategoryResponse';
  displayOrder?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  id: FieldWrapper<Scalars['String']['output']>;
  memo?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  name: FieldWrapper<Scalars['String']['output']>;
  parentCategoryId?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  userSettingId: FieldWrapper<Scalars['String']['output']>;
};

export type PostPlaceResponse = {
  __typename?: 'PostPlaceResponse';
  address?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  categoryIdList: Array<FieldWrapper<Scalars['String']['output']>>;
  detail?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  id: FieldWrapper<Scalars['String']['output']>;
  latLon?: Maybe<FieldWrapper<LatLonResponse>>;
  name: FieldWrapper<Scalars['String']['output']>;
  prefectureCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  url?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  userSettingId: FieldWrapper<Scalars['String']['output']>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  categoryIdList: Array<FieldWrapper<Scalars['String']['output']>>;
  detail?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  id: FieldWrapper<Scalars['String']['output']>;
  isOpen: FieldWrapper<Scalars['Boolean']['output']>;
  placeId: FieldWrapper<Scalars['String']['output']>;
  placeName: FieldWrapper<Scalars['String']['output']>;
  placePrefectureCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  placeUrl?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title: FieldWrapper<Scalars['String']['output']>;
  urlList: Array<FieldWrapper<UrlDetail>>;
  userSettingId: FieldWrapper<Scalars['String']['output']>;
  visitedDate: FieldWrapper<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAccountUserByToken: FieldWrapper<AccountUserResponse>;
  getLatLonFromAddress?: Maybe<FieldWrapper<LatLonResponse>>;
  getMyPostCategories: Array<FieldWrapper<PostCategoryResponse>>;
  getMyPostCategoryById: FieldWrapper<PostCategoryResponse>;
  getMyPosts: Array<FieldWrapper<PostResponse>>;
  getPostPlaces: Array<FieldWrapper<PostPlaceResponse>>;
};


export type QueryGetLatLonFromAddressArgs = {
  address: Scalars['String']['input'];
};


export type QueryGetMyPostCategoriesArgs = {
  nameFilter?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMyPostCategoryByIdArgs = {
  idFilter: Scalars['String']['input'];
};


export type QueryGetMyPostsArgs = {
  idFilter?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPostPlacesArgs = {
  categoryFilter?: InputMaybe<Scalars['String']['input']>;
  idFilter?: InputMaybe<Scalars['String']['input']>;
  nameFilter?: InputMaybe<Scalars['String']['input']>;
};

export type UrlDetail = {
  __typename?: 'UrlDetail';
  embedHtml?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  url: FieldWrapper<Scalars['String']['output']>;
  urlId: FieldWrapper<Scalars['String']['output']>;
  urlInfo?: Maybe<FieldWrapper<UrlInfo>>;
  urlType: FieldWrapper<UrlTypeEnum>;
};

export type UrlInfo = {
  __typename?: 'UrlInfo';
  imageUrl?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  siteName?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title: FieldWrapper<Scalars['String']['output']>;
};

export enum UrlTypeEnum {
  Instagram = 'Instagram',
  Threads = 'Threads',
  WebNoInfo = 'WebNoInfo',
  WebWithInfo = 'WebWithInfo',
  X = 'X'
}

export type GoogleAuthCodeVerifyMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type GoogleAuthCodeVerifyMutation = { __typename?: 'Mutation', googleAuthCodeVerify: { __typename?: 'GoogleAuthCodeVerifyResponse', token: string } };

export type LoginByGoogleAuthCodeMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type LoginByGoogleAuthCodeMutation = { __typename?: 'Mutation', loginByGoogleAuthCode: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null } };

export type AddAccountUserByGoogleMutationVariables = Exact<{
  authToken: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type AddAccountUserByGoogleMutation = { __typename?: 'Mutation', addAccountUserByGoogle: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null } };

export type EditAccountUserMutationVariables = Exact<{
  userSettingId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type EditAccountUserMutation = { __typename?: 'Mutation', editAccountUser: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null } };

export type GetAccountUserByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountUserByTokenQuery = { __typename?: 'Query', getAccountUserByToken: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null } };


export const GoogleAuthCodeVerifyDocument = gql`
    mutation GoogleAuthCodeVerify($authCode: String!) {
  googleAuthCodeVerify(authCode: $authCode) {
    token
  }
}
    `;
export type GoogleAuthCodeVerifyMutationFn = Apollo.MutationFunction<GoogleAuthCodeVerifyMutation, GoogleAuthCodeVerifyMutationVariables>;

/**
 * __useGoogleAuthCodeVerifyMutation__
 *
 * To run a mutation, you first call `useGoogleAuthCodeVerifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleAuthCodeVerifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleAuthCodeVerifyMutation, { data, loading, error }] = useGoogleAuthCodeVerifyMutation({
 *   variables: {
 *      authCode: // value for 'authCode'
 *   },
 * });
 */
export function useGoogleAuthCodeVerifyMutation(baseOptions?: Apollo.MutationHookOptions<GoogleAuthCodeVerifyMutation, GoogleAuthCodeVerifyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleAuthCodeVerifyMutation, GoogleAuthCodeVerifyMutationVariables>(GoogleAuthCodeVerifyDocument, options);
      }
export type GoogleAuthCodeVerifyMutationHookResult = ReturnType<typeof useGoogleAuthCodeVerifyMutation>;
export type GoogleAuthCodeVerifyMutationResult = Apollo.MutationResult<GoogleAuthCodeVerifyMutation>;
export type GoogleAuthCodeVerifyMutationOptions = Apollo.BaseMutationOptions<GoogleAuthCodeVerifyMutation, GoogleAuthCodeVerifyMutationVariables>;
export const LoginByGoogleAuthCodeDocument = gql`
    mutation LoginByGoogleAuthCode($authCode: String!) {
  loginByGoogleAuthCode(authCode: $authCode) {
    token
    userSettingId
    name
    imageUrl
  }
}
    `;
export type LoginByGoogleAuthCodeMutationFn = Apollo.MutationFunction<LoginByGoogleAuthCodeMutation, LoginByGoogleAuthCodeMutationVariables>;

/**
 * __useLoginByGoogleAuthCodeMutation__
 *
 * To run a mutation, you first call `useLoginByGoogleAuthCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginByGoogleAuthCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginByGoogleAuthCodeMutation, { data, loading, error }] = useLoginByGoogleAuthCodeMutation({
 *   variables: {
 *      authCode: // value for 'authCode'
 *   },
 * });
 */
export function useLoginByGoogleAuthCodeMutation(baseOptions?: Apollo.MutationHookOptions<LoginByGoogleAuthCodeMutation, LoginByGoogleAuthCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginByGoogleAuthCodeMutation, LoginByGoogleAuthCodeMutationVariables>(LoginByGoogleAuthCodeDocument, options);
      }
export type LoginByGoogleAuthCodeMutationHookResult = ReturnType<typeof useLoginByGoogleAuthCodeMutation>;
export type LoginByGoogleAuthCodeMutationResult = Apollo.MutationResult<LoginByGoogleAuthCodeMutation>;
export type LoginByGoogleAuthCodeMutationOptions = Apollo.BaseMutationOptions<LoginByGoogleAuthCodeMutation, LoginByGoogleAuthCodeMutationVariables>;
export const AddAccountUserByGoogleDocument = gql`
    mutation AddAccountUserByGoogle($authToken: String!, $userSettingId: String!, $name: String!, $file: Upload) {
  addAccountUserByGoogle(
    authToken: $authToken
    userSettingId: $userSettingId
    name: $name
    imageFile: $file
  ) {
    token
    userSettingId
    name
    imageUrl
  }
}
    `;
export type AddAccountUserByGoogleMutationFn = Apollo.MutationFunction<AddAccountUserByGoogleMutation, AddAccountUserByGoogleMutationVariables>;

/**
 * __useAddAccountUserByGoogleMutation__
 *
 * To run a mutation, you first call `useAddAccountUserByGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAccountUserByGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAccountUserByGoogleMutation, { data, loading, error }] = useAddAccountUserByGoogleMutation({
 *   variables: {
 *      authToken: // value for 'authToken'
 *      userSettingId: // value for 'userSettingId'
 *      name: // value for 'name'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useAddAccountUserByGoogleMutation(baseOptions?: Apollo.MutationHookOptions<AddAccountUserByGoogleMutation, AddAccountUserByGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAccountUserByGoogleMutation, AddAccountUserByGoogleMutationVariables>(AddAccountUserByGoogleDocument, options);
      }
export type AddAccountUserByGoogleMutationHookResult = ReturnType<typeof useAddAccountUserByGoogleMutation>;
export type AddAccountUserByGoogleMutationResult = Apollo.MutationResult<AddAccountUserByGoogleMutation>;
export type AddAccountUserByGoogleMutationOptions = Apollo.BaseMutationOptions<AddAccountUserByGoogleMutation, AddAccountUserByGoogleMutationVariables>;
export const EditAccountUserDocument = gql`
    mutation EditAccountUser($userSettingId: String!, $name: String!, $file: Upload) {
  editAccountUser(userSettingId: $userSettingId, name: $name, imageFile: $file) {
    token
    userSettingId
    name
    imageUrl
  }
}
    `;
export type EditAccountUserMutationFn = Apollo.MutationFunction<EditAccountUserMutation, EditAccountUserMutationVariables>;

/**
 * __useEditAccountUserMutation__
 *
 * To run a mutation, you first call `useEditAccountUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAccountUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAccountUserMutation, { data, loading, error }] = useEditAccountUserMutation({
 *   variables: {
 *      userSettingId: // value for 'userSettingId'
 *      name: // value for 'name'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useEditAccountUserMutation(baseOptions?: Apollo.MutationHookOptions<EditAccountUserMutation, EditAccountUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAccountUserMutation, EditAccountUserMutationVariables>(EditAccountUserDocument, options);
      }
export type EditAccountUserMutationHookResult = ReturnType<typeof useEditAccountUserMutation>;
export type EditAccountUserMutationResult = Apollo.MutationResult<EditAccountUserMutation>;
export type EditAccountUserMutationOptions = Apollo.BaseMutationOptions<EditAccountUserMutation, EditAccountUserMutationVariables>;
export const GetAccountUserByTokenDocument = gql`
    query getAccountUserByToken {
  getAccountUserByToken {
    token
    userSettingId
    name
    imageUrl
  }
}
    `;

/**
 * __useGetAccountUserByTokenQuery__
 *
 * To run a query within a React component, call `useGetAccountUserByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountUserByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountUserByTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountUserByTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountUserByTokenQuery, GetAccountUserByTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountUserByTokenQuery, GetAccountUserByTokenQueryVariables>(GetAccountUserByTokenDocument, options);
      }
export function useGetAccountUserByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountUserByTokenQuery, GetAccountUserByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountUserByTokenQuery, GetAccountUserByTokenQueryVariables>(GetAccountUserByTokenDocument, options);
        }
export function useGetAccountUserByTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAccountUserByTokenQuery, GetAccountUserByTokenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountUserByTokenQuery, GetAccountUserByTokenQueryVariables>(GetAccountUserByTokenDocument, options);
        }
export type GetAccountUserByTokenQueryHookResult = ReturnType<typeof useGetAccountUserByTokenQuery>;
export type GetAccountUserByTokenLazyQueryHookResult = ReturnType<typeof useGetAccountUserByTokenLazyQuery>;
export type GetAccountUserByTokenSuspenseQueryHookResult = ReturnType<typeof useGetAccountUserByTokenSuspenseQuery>;
export type GetAccountUserByTokenQueryResult = Apollo.QueryResult<GetAccountUserByTokenQuery, GetAccountUserByTokenQueryVariables>;