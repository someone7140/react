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

export type LatLon = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
};

export type LatLonResponse = {
  __typename?: 'LatLonResponse';
  lat: FieldWrapper<Scalars['Float']['output']>;
  lon: FieldWrapper<Scalars['Float']['output']>;
};

export type PlaceNoteMutation = {
  __typename?: 'PlaceNoteMutation';
  addAccountUserByGoogle: FieldWrapper<AccountUserResponse>;
  addPostCategory: FieldWrapper<Scalars['Boolean']['output']>;
  addPostPlace: FieldWrapper<Scalars['Boolean']['output']>;
  deletePostCategory: FieldWrapper<Scalars['Boolean']['output']>;
  deletePostPlace: FieldWrapper<Scalars['Boolean']['output']>;
  editAccountUser: FieldWrapper<AccountUserResponse>;
  editPostCategory: FieldWrapper<Scalars['Boolean']['output']>;
  editPostPlace: FieldWrapper<Scalars['Boolean']['output']>;
  googleAuthCodeVerify: FieldWrapper<GoogleAuthCodeVerifyResponse>;
  loginByGoogleAuthCode: FieldWrapper<AccountUserResponse>;
};


export type PlaceNoteMutationAddAccountUserByGoogleArgs = {
  authToken: Scalars['String']['input'];
  imageFile?: InputMaybe<Scalars['Upload']['input']>;
  name: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};


export type PlaceNoteMutationAddPostCategoryArgs = {
  detail?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
};


export type PlaceNoteMutationAddPostPlaceArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  categoryIdList: Array<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  latLon?: InputMaybe<LatLon>;
  name: Scalars['String']['input'];
  prefectureCode?: InputMaybe<Scalars['String']['input']>;
  urlList: Array<Scalars['String']['input']>;
};


export type PlaceNoteMutationDeletePostCategoryArgs = {
  id: Scalars['String']['input'];
};


export type PlaceNoteMutationDeletePostPlaceArgs = {
  id: Scalars['String']['input'];
};


export type PlaceNoteMutationEditAccountUserArgs = {
  imageFile?: InputMaybe<Scalars['Upload']['input']>;
  name: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};


export type PlaceNoteMutationEditPostCategoryArgs = {
  detail?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
};


export type PlaceNoteMutationEditPostPlaceArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  categoryIdList: Array<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  latLon?: InputMaybe<LatLon>;
  name: Scalars['String']['input'];
  prefectureCode?: InputMaybe<Scalars['String']['input']>;
  urlList: Array<Scalars['String']['input']>;
};


export type PlaceNoteMutationGoogleAuthCodeVerifyArgs = {
  authCode: Scalars['String']['input'];
};


export type PlaceNoteMutationLoginByGoogleAuthCodeArgs = {
  authCode: Scalars['String']['input'];
};

export type PlaceNoteQuery = {
  __typename?: 'PlaceNoteQuery';
  getAccountUserByToken: FieldWrapper<AccountUserResponse>;
  getLatLonFromAddress?: Maybe<FieldWrapper<LatLonResponse>>;
  getMyPostCategories: Array<FieldWrapper<PostCategoryResponse>>;
  getMyPostCategoryById: FieldWrapper<PostCategoryResponse>;
  getPostPlaces: FieldWrapper<PostCategoryResponse>;
};


export type PlaceNoteQueryGetLatLonFromAddressArgs = {
  address: Scalars['String']['input'];
};


export type PlaceNoteQueryGetMyPostCategoriesArgs = {
  nameFilter?: InputMaybe<Scalars['String']['input']>;
};


export type PlaceNoteQueryGetMyPostCategoryByIdArgs = {
  idFilter: Scalars['String']['input'];
};


export type PlaceNoteQueryGetPostPlacesArgs = {
  categoryFilter?: InputMaybe<Scalars['String']['input']>;
  idFilter?: InputMaybe<Scalars['String']['input']>;
};

export type PostCategoryResponse = {
  __typename?: 'PostCategoryResponse';
  detail?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  displayOrder?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  id: FieldWrapper<Scalars['String']['output']>;
  name: FieldWrapper<Scalars['String']['output']>;
  parentCategoryId?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  userSettingId: FieldWrapper<Scalars['String']['output']>;
};

export type AccountUserObjFragment = { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null };

export type GoogleAuthCodeVerifyMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type GoogleAuthCodeVerifyMutation = { __typename?: 'PlaceNoteMutation', googleAuthCodeVerify: { __typename?: 'GoogleAuthCodeVerifyResponse', token: string } };

export type LoginByGoogleAuthCodeMutationVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type LoginByGoogleAuthCodeMutation = { __typename?: 'PlaceNoteMutation', loginByGoogleAuthCode: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null } };

export type AddAccountUserByGoogleMutationVariables = Exact<{
  authToken: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type AddAccountUserByGoogleMutation = { __typename?: 'PlaceNoteMutation', addAccountUserByGoogle: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null } };

export type EditAccountUserMutationVariables = Exact<{
  userSettingId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type EditAccountUserMutation = { __typename?: 'PlaceNoteMutation', editAccountUser: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null } };

export type GetAccountUserByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountUserByTokenQuery = { __typename?: 'PlaceNoteQuery', getAccountUserByToken: { __typename?: 'AccountUserResponse', token: string, userSettingId: string, name: string, imageUrl?: string | null } };

export type PostCategoryObjFragment = { __typename?: 'PostCategoryResponse', id: string, userSettingId: string, name: string, parentCategoryId?: string | null, displayOrder?: number | null, detail?: string | null };

export type AddPostCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddPostCategoryMutation = { __typename?: 'PlaceNoteMutation', addPostCategory: boolean };

export type DeletePostCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePostCategoryMutation = { __typename?: 'PlaceNoteMutation', deletePostCategory: boolean };

export type GetMyPostCategoriesQueryVariables = Exact<{
  nameFilter?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMyPostCategoriesQuery = { __typename?: 'PlaceNoteQuery', getMyPostCategories: Array<{ __typename?: 'PostCategoryResponse', id: string, userSettingId: string, name: string, parentCategoryId?: string | null, displayOrder?: number | null, detail?: string | null }> };

export type GetMyPostCategoryByIdQueryVariables = Exact<{
  idFilter: Scalars['String']['input'];
}>;


export type GetMyPostCategoryByIdQuery = { __typename?: 'PlaceNoteQuery', getMyPostCategoryById: { __typename?: 'PostCategoryResponse', id: string, userSettingId: string, name: string, parentCategoryId?: string | null, displayOrder?: number | null, detail?: string | null } };

export const AccountUserObjFragmentDoc = gql`
    fragment AccountUserObj on AccountUserResponse {
  token
  userSettingId
  name
  imageUrl
}
    `;
export const PostCategoryObjFragmentDoc = gql`
    fragment PostCategoryObj on PostCategoryResponse {
  id
  userSettingId
  name
  parentCategoryId
  displayOrder
  detail
}
    `;
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
    ...AccountUserObj
  }
}
    ${AccountUserObjFragmentDoc}`;
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
    ...AccountUserObj
  }
}
    ${AccountUserObjFragmentDoc}`;
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
    ...AccountUserObj
  }
}
    ${AccountUserObjFragmentDoc}`;
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
    query GetAccountUserByToken {
  getAccountUserByToken {
    ...AccountUserObj
  }
}
    ${AccountUserObjFragmentDoc}`;

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
export const AddPostCategoryDocument = gql`
    mutation AddPostCategory($name: String!, $parentCategoryId: String, $displayOrder: Int, $detail: String) {
  addPostCategory(
    name: $name
    parentCategoryId: $parentCategoryId
    displayOrder: $displayOrder
    detail: $detail
  )
}
    `;
export type AddPostCategoryMutationFn = Apollo.MutationFunction<AddPostCategoryMutation, AddPostCategoryMutationVariables>;

/**
 * __useAddPostCategoryMutation__
 *
 * To run a mutation, you first call `useAddPostCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostCategoryMutation, { data, loading, error }] = useAddPostCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      parentCategoryId: // value for 'parentCategoryId'
 *      displayOrder: // value for 'displayOrder'
 *      detail: // value for 'detail'
 *   },
 * });
 */
export function useAddPostCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddPostCategoryMutation, AddPostCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostCategoryMutation, AddPostCategoryMutationVariables>(AddPostCategoryDocument, options);
      }
export type AddPostCategoryMutationHookResult = ReturnType<typeof useAddPostCategoryMutation>;
export type AddPostCategoryMutationResult = Apollo.MutationResult<AddPostCategoryMutation>;
export type AddPostCategoryMutationOptions = Apollo.BaseMutationOptions<AddPostCategoryMutation, AddPostCategoryMutationVariables>;
export const DeletePostCategoryDocument = gql`
    mutation DeletePostCategory($id: String!) {
  deletePostCategory(id: $id)
}
    `;
export type DeletePostCategoryMutationFn = Apollo.MutationFunction<DeletePostCategoryMutation, DeletePostCategoryMutationVariables>;

/**
 * __useDeletePostCategoryMutation__
 *
 * To run a mutation, you first call `useDeletePostCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostCategoryMutation, { data, loading, error }] = useDeletePostCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostCategoryMutation, DeletePostCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostCategoryMutation, DeletePostCategoryMutationVariables>(DeletePostCategoryDocument, options);
      }
export type DeletePostCategoryMutationHookResult = ReturnType<typeof useDeletePostCategoryMutation>;
export type DeletePostCategoryMutationResult = Apollo.MutationResult<DeletePostCategoryMutation>;
export type DeletePostCategoryMutationOptions = Apollo.BaseMutationOptions<DeletePostCategoryMutation, DeletePostCategoryMutationVariables>;
export const GetMyPostCategoriesDocument = gql`
    query GetMyPostCategories($nameFilter: String) {
  getMyPostCategories(nameFilter: $nameFilter) {
    ...PostCategoryObj
  }
}
    ${PostCategoryObjFragmentDoc}`;

/**
 * __useGetMyPostCategoriesQuery__
 *
 * To run a query within a React component, call `useGetMyPostCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyPostCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyPostCategoriesQuery({
 *   variables: {
 *      nameFilter: // value for 'nameFilter'
 *   },
 * });
 */
export function useGetMyPostCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetMyPostCategoriesQuery, GetMyPostCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyPostCategoriesQuery, GetMyPostCategoriesQueryVariables>(GetMyPostCategoriesDocument, options);
      }
export function useGetMyPostCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyPostCategoriesQuery, GetMyPostCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyPostCategoriesQuery, GetMyPostCategoriesQueryVariables>(GetMyPostCategoriesDocument, options);
        }
export function useGetMyPostCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyPostCategoriesQuery, GetMyPostCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyPostCategoriesQuery, GetMyPostCategoriesQueryVariables>(GetMyPostCategoriesDocument, options);
        }
export type GetMyPostCategoriesQueryHookResult = ReturnType<typeof useGetMyPostCategoriesQuery>;
export type GetMyPostCategoriesLazyQueryHookResult = ReturnType<typeof useGetMyPostCategoriesLazyQuery>;
export type GetMyPostCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetMyPostCategoriesSuspenseQuery>;
export type GetMyPostCategoriesQueryResult = Apollo.QueryResult<GetMyPostCategoriesQuery, GetMyPostCategoriesQueryVariables>;
export const GetMyPostCategoryByIdDocument = gql`
    query GetMyPostCategoryById($idFilter: String!) {
  getMyPostCategoryById(idFilter: $idFilter) {
    ...PostCategoryObj
  }
}
    ${PostCategoryObjFragmentDoc}`;

/**
 * __useGetMyPostCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetMyPostCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyPostCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyPostCategoryByIdQuery({
 *   variables: {
 *      idFilter: // value for 'idFilter'
 *   },
 * });
 */
export function useGetMyPostCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMyPostCategoryByIdQuery, GetMyPostCategoryByIdQueryVariables> & ({ variables: GetMyPostCategoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyPostCategoryByIdQuery, GetMyPostCategoryByIdQueryVariables>(GetMyPostCategoryByIdDocument, options);
      }
export function useGetMyPostCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyPostCategoryByIdQuery, GetMyPostCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyPostCategoryByIdQuery, GetMyPostCategoryByIdQueryVariables>(GetMyPostCategoryByIdDocument, options);
        }
export function useGetMyPostCategoryByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyPostCategoryByIdQuery, GetMyPostCategoryByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyPostCategoryByIdQuery, GetMyPostCategoryByIdQueryVariables>(GetMyPostCategoryByIdDocument, options);
        }
export type GetMyPostCategoryByIdQueryHookResult = ReturnType<typeof useGetMyPostCategoryByIdQuery>;
export type GetMyPostCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetMyPostCategoryByIdLazyQuery>;
export type GetMyPostCategoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetMyPostCategoryByIdSuspenseQuery>;
export type GetMyPostCategoryByIdQueryResult = Apollo.QueryResult<GetMyPostCategoryByIdQuery, GetMyPostCategoryByIdQueryVariables>;