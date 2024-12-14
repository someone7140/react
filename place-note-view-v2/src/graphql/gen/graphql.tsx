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
  addPost: FieldWrapper<Scalars['Boolean']['output']>;
  addPostCategory: FieldWrapper<Scalars['Boolean']['output']>;
  addPostPlace: FieldWrapper<Scalars['String']['output']>;
  deletePost: FieldWrapper<Scalars['Boolean']['output']>;
  deletePostCategory: FieldWrapper<Scalars['Boolean']['output']>;
  deletePostPlace: FieldWrapper<Scalars['Boolean']['output']>;
  editAccountUser: FieldWrapper<AccountUserResponse>;
  editPost: FieldWrapper<Scalars['Boolean']['output']>;
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


export type PlaceNoteMutationAddPostArgs = {
  categoryIdList: Array<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  isOpen: Scalars['Boolean']['input'];
  placeId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  urlList: Array<Scalars['String']['input']>;
  visitedDate: Scalars['DateTime']['input'];
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
  url?: InputMaybe<Scalars['String']['input']>;
};


export type PlaceNoteMutationDeletePostArgs = {
  id: Scalars['String']['input'];
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


export type PlaceNoteMutationEditPostArgs = {
  categoryIdList: Array<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isOpen: Scalars['Boolean']['input'];
  placeId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  urlList: Array<Scalars['String']['input']>;
  visitedDate: Scalars['DateTime']['input'];
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
  url?: InputMaybe<Scalars['String']['input']>;
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
  getMyPosts: Array<FieldWrapper<PostResponse>>;
  getPostPlaces: Array<FieldWrapper<PostPlaceResponse>>;
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


export type PlaceNoteQueryGetMyPostsArgs = {
  categoryIdsFilter?: InputMaybe<Array<Scalars['String']['input']>>;
  idFilter?: InputMaybe<Scalars['String']['input']>;
  placeIdFilter?: InputMaybe<Scalars['String']['input']>;
};


export type PlaceNoteQueryGetPostPlacesArgs = {
  categoryFilter?: InputMaybe<Scalars['String']['input']>;
  idFilter?: InputMaybe<Scalars['String']['input']>;
  nameFilter?: InputMaybe<Scalars['String']['input']>;
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

export type PostPlaceInfo = {
  __typename?: 'PostPlaceInfo';
  address?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  id: FieldWrapper<Scalars['String']['output']>;
  latLon?: Maybe<FieldWrapper<LatLonResponse>>;
  name: FieldWrapper<Scalars['String']['output']>;
  prefectureCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  url?: Maybe<FieldWrapper<Scalars['String']['output']>>;
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
  postPlace: FieldWrapper<PostPlaceInfo>;
  title: FieldWrapper<Scalars['String']['output']>;
  urlList: Array<FieldWrapper<PostUrl>>;
  userSettingId: FieldWrapper<Scalars['String']['output']>;
  visitedDateStr: FieldWrapper<Scalars['String']['output']>;
};

export type PostUrl = {
  __typename?: 'PostUrl';
  embedHtml?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  url: FieldWrapper<Scalars['String']['output']>;
  urlInfo?: Maybe<FieldWrapper<PostUrlInfo>>;
  urlType: FieldWrapper<Scalars['String']['output']>;
};

export type PostUrlInfo = {
  __typename?: 'PostUrlInfo';
  imageUrl?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  siteName?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title: FieldWrapper<Scalars['String']['output']>;
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

export type EditPostCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditPostCategoryMutation = { __typename?: 'PlaceNoteMutation', editPostCategory: boolean };

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

export type AddPostPlaceMutationVariables = Exact<{
  name: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  latLon?: InputMaybe<LatLon>;
  prefectureCode?: InputMaybe<Scalars['String']['input']>;
  categoryIdList: Array<Scalars['String']['input']> | Scalars['String']['input'];
  detail?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddPostPlaceMutation = { __typename?: 'PlaceNoteMutation', addPostPlace: string };

export type GetLatLonFromAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetLatLonFromAddressQuery = { __typename?: 'PlaceNoteQuery', getLatLonFromAddress?: { __typename?: 'LatLonResponse', lat: number, lon: number } | null };

export type GetPostPlacesAndCategoriesQueryVariables = Exact<{
  idFilter?: InputMaybe<Scalars['String']['input']>;
  categoryFilter?: InputMaybe<Scalars['String']['input']>;
  nameFilter?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostPlacesAndCategoriesQuery = { __typename?: 'PlaceNoteQuery', getPostPlaces: Array<{ __typename?: 'PostPlaceResponse', id: string, name: string, userSettingId: string, address?: string | null, prefectureCode?: string | null, categoryIdList: Array<string>, detail?: string | null, url?: string | null, latLon?: { __typename?: 'LatLonResponse', lat: number, lon: number } | null }>, getMyPostCategories: Array<{ __typename?: 'PostCategoryResponse', id: string, userSettingId: string, name: string, parentCategoryId?: string | null, displayOrder?: number | null, detail?: string | null }> };

export type EditPostPlaceMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  latLon?: InputMaybe<LatLon>;
  prefectureCode?: InputMaybe<Scalars['String']['input']>;
  categoryIdList: Array<Scalars['String']['input']> | Scalars['String']['input'];
  detail?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditPostPlaceMutation = { __typename?: 'PlaceNoteMutation', editPostPlace: boolean };

export type DeletePostPlaceMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePostPlaceMutation = { __typename?: 'PlaceNoteMutation', deletePostPlace: boolean };

export type AddPostMutationVariables = Exact<{
  title: Scalars['String']['input'];
  placeId: Scalars['String']['input'];
  visitedDate: Scalars['DateTime']['input'];
  isOpen: Scalars['Boolean']['input'];
  categoryIdList: Array<Scalars['String']['input']> | Scalars['String']['input'];
  detail?: InputMaybe<Scalars['String']['input']>;
  urlList: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AddPostMutation = { __typename?: 'PlaceNoteMutation', addPost: boolean };

export type GetMyPostsQueryVariables = Exact<{
  idFilter?: InputMaybe<Scalars['String']['input']>;
  categoryIdsFilter?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  placeIdFilter?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMyPostsQuery = { __typename?: 'PlaceNoteQuery', getMyPosts: Array<{ __typename?: 'PostResponse', id: string, userSettingId: string, title: string, visitedDateStr: string, isOpen: boolean, categoryIdList: Array<string>, detail?: string | null, postPlace: { __typename?: 'PostPlaceInfo', id: string, name: string, prefectureCode?: string | null, url?: string | null, address?: string | null, latLon?: { __typename?: 'LatLonResponse', lat: number, lon: number } | null }, urlList: Array<{ __typename?: 'PostUrl', url: string, urlType: string, embedHtml?: string | null, urlInfo?: { __typename?: 'PostUrlInfo', title: string, imageUrl?: string | null, siteName?: string | null } | null }> }> };

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
export const EditPostCategoryDocument = gql`
    mutation EditPostCategory($id: String!, $name: String!, $parentCategoryId: String, $displayOrder: Int, $detail: String) {
  editPostCategory(
    id: $id
    name: $name
    parentCategoryId: $parentCategoryId
    displayOrder: $displayOrder
    detail: $detail
  )
}
    `;
export type EditPostCategoryMutationFn = Apollo.MutationFunction<EditPostCategoryMutation, EditPostCategoryMutationVariables>;

/**
 * __useEditPostCategoryMutation__
 *
 * To run a mutation, you first call `useEditPostCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostCategoryMutation, { data, loading, error }] = useEditPostCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      parentCategoryId: // value for 'parentCategoryId'
 *      displayOrder: // value for 'displayOrder'
 *      detail: // value for 'detail'
 *   },
 * });
 */
export function useEditPostCategoryMutation(baseOptions?: Apollo.MutationHookOptions<EditPostCategoryMutation, EditPostCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostCategoryMutation, EditPostCategoryMutationVariables>(EditPostCategoryDocument, options);
      }
export type EditPostCategoryMutationHookResult = ReturnType<typeof useEditPostCategoryMutation>;
export type EditPostCategoryMutationResult = Apollo.MutationResult<EditPostCategoryMutation>;
export type EditPostCategoryMutationOptions = Apollo.BaseMutationOptions<EditPostCategoryMutation, EditPostCategoryMutationVariables>;
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
export const AddPostPlaceDocument = gql`
    mutation AddPostPlace($name: String!, $address: String, $latLon: LatLon, $prefectureCode: String, $categoryIdList: [String!]!, $detail: String, $url: String) {
  addPostPlace(
    name: $name
    address: $address
    latLon: $latLon
    prefectureCode: $prefectureCode
    categoryIdList: $categoryIdList
    detail: $detail
    url: $url
  )
}
    `;
export type AddPostPlaceMutationFn = Apollo.MutationFunction<AddPostPlaceMutation, AddPostPlaceMutationVariables>;

/**
 * __useAddPostPlaceMutation__
 *
 * To run a mutation, you first call `useAddPostPlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostPlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostPlaceMutation, { data, loading, error }] = useAddPostPlaceMutation({
 *   variables: {
 *      name: // value for 'name'
 *      address: // value for 'address'
 *      latLon: // value for 'latLon'
 *      prefectureCode: // value for 'prefectureCode'
 *      categoryIdList: // value for 'categoryIdList'
 *      detail: // value for 'detail'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useAddPostPlaceMutation(baseOptions?: Apollo.MutationHookOptions<AddPostPlaceMutation, AddPostPlaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostPlaceMutation, AddPostPlaceMutationVariables>(AddPostPlaceDocument, options);
      }
export type AddPostPlaceMutationHookResult = ReturnType<typeof useAddPostPlaceMutation>;
export type AddPostPlaceMutationResult = Apollo.MutationResult<AddPostPlaceMutation>;
export type AddPostPlaceMutationOptions = Apollo.BaseMutationOptions<AddPostPlaceMutation, AddPostPlaceMutationVariables>;
export const GetLatLonFromAddressDocument = gql`
    query GetLatLonFromAddress($address: String!) {
  getLatLonFromAddress(address: $address) {
    lat
    lon
  }
}
    `;

/**
 * __useGetLatLonFromAddressQuery__
 *
 * To run a query within a React component, call `useGetLatLonFromAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatLonFromAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatLonFromAddressQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useGetLatLonFromAddressQuery(baseOptions: Apollo.QueryHookOptions<GetLatLonFromAddressQuery, GetLatLonFromAddressQueryVariables> & ({ variables: GetLatLonFromAddressQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLatLonFromAddressQuery, GetLatLonFromAddressQueryVariables>(GetLatLonFromAddressDocument, options);
      }
export function useGetLatLonFromAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLatLonFromAddressQuery, GetLatLonFromAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLatLonFromAddressQuery, GetLatLonFromAddressQueryVariables>(GetLatLonFromAddressDocument, options);
        }
export function useGetLatLonFromAddressSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLatLonFromAddressQuery, GetLatLonFromAddressQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLatLonFromAddressQuery, GetLatLonFromAddressQueryVariables>(GetLatLonFromAddressDocument, options);
        }
export type GetLatLonFromAddressQueryHookResult = ReturnType<typeof useGetLatLonFromAddressQuery>;
export type GetLatLonFromAddressLazyQueryHookResult = ReturnType<typeof useGetLatLonFromAddressLazyQuery>;
export type GetLatLonFromAddressSuspenseQueryHookResult = ReturnType<typeof useGetLatLonFromAddressSuspenseQuery>;
export type GetLatLonFromAddressQueryResult = Apollo.QueryResult<GetLatLonFromAddressQuery, GetLatLonFromAddressQueryVariables>;
export const GetPostPlacesAndCategoriesDocument = gql`
    query GetPostPlacesAndCategories($idFilter: String, $categoryFilter: String, $nameFilter: String) {
  getPostPlaces(
    idFilter: $idFilter
    categoryFilter: $categoryFilter
    nameFilter: $nameFilter
  ) {
    id
    name
    userSettingId
    address
    latLon {
      lat
      lon
    }
    prefectureCode
    categoryIdList
    detail
    url
  }
  getMyPostCategories(nameFilter: null) {
    ...PostCategoryObj
  }
}
    ${PostCategoryObjFragmentDoc}`;

/**
 * __useGetPostPlacesAndCategoriesQuery__
 *
 * To run a query within a React component, call `useGetPostPlacesAndCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostPlacesAndCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostPlacesAndCategoriesQuery({
 *   variables: {
 *      idFilter: // value for 'idFilter'
 *      categoryFilter: // value for 'categoryFilter'
 *      nameFilter: // value for 'nameFilter'
 *   },
 * });
 */
export function useGetPostPlacesAndCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetPostPlacesAndCategoriesQuery, GetPostPlacesAndCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostPlacesAndCategoriesQuery, GetPostPlacesAndCategoriesQueryVariables>(GetPostPlacesAndCategoriesDocument, options);
      }
export function useGetPostPlacesAndCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostPlacesAndCategoriesQuery, GetPostPlacesAndCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostPlacesAndCategoriesQuery, GetPostPlacesAndCategoriesQueryVariables>(GetPostPlacesAndCategoriesDocument, options);
        }
export function useGetPostPlacesAndCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostPlacesAndCategoriesQuery, GetPostPlacesAndCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostPlacesAndCategoriesQuery, GetPostPlacesAndCategoriesQueryVariables>(GetPostPlacesAndCategoriesDocument, options);
        }
export type GetPostPlacesAndCategoriesQueryHookResult = ReturnType<typeof useGetPostPlacesAndCategoriesQuery>;
export type GetPostPlacesAndCategoriesLazyQueryHookResult = ReturnType<typeof useGetPostPlacesAndCategoriesLazyQuery>;
export type GetPostPlacesAndCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetPostPlacesAndCategoriesSuspenseQuery>;
export type GetPostPlacesAndCategoriesQueryResult = Apollo.QueryResult<GetPostPlacesAndCategoriesQuery, GetPostPlacesAndCategoriesQueryVariables>;
export const EditPostPlaceDocument = gql`
    mutation EditPostPlace($id: String!, $name: String!, $address: String, $latLon: LatLon, $prefectureCode: String, $categoryIdList: [String!]!, $detail: String, $url: String) {
  editPostPlace(
    id: $id
    name: $name
    address: $address
    latLon: $latLon
    prefectureCode: $prefectureCode
    categoryIdList: $categoryIdList
    detail: $detail
    url: $url
  )
}
    `;
export type EditPostPlaceMutationFn = Apollo.MutationFunction<EditPostPlaceMutation, EditPostPlaceMutationVariables>;

/**
 * __useEditPostPlaceMutation__
 *
 * To run a mutation, you first call `useEditPostPlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostPlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostPlaceMutation, { data, loading, error }] = useEditPostPlaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      address: // value for 'address'
 *      latLon: // value for 'latLon'
 *      prefectureCode: // value for 'prefectureCode'
 *      categoryIdList: // value for 'categoryIdList'
 *      detail: // value for 'detail'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useEditPostPlaceMutation(baseOptions?: Apollo.MutationHookOptions<EditPostPlaceMutation, EditPostPlaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostPlaceMutation, EditPostPlaceMutationVariables>(EditPostPlaceDocument, options);
      }
export type EditPostPlaceMutationHookResult = ReturnType<typeof useEditPostPlaceMutation>;
export type EditPostPlaceMutationResult = Apollo.MutationResult<EditPostPlaceMutation>;
export type EditPostPlaceMutationOptions = Apollo.BaseMutationOptions<EditPostPlaceMutation, EditPostPlaceMutationVariables>;
export const DeletePostPlaceDocument = gql`
    mutation DeletePostPlace($id: String!) {
  deletePostPlace(id: $id)
}
    `;
export type DeletePostPlaceMutationFn = Apollo.MutationFunction<DeletePostPlaceMutation, DeletePostPlaceMutationVariables>;

/**
 * __useDeletePostPlaceMutation__
 *
 * To run a mutation, you first call `useDeletePostPlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostPlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostPlaceMutation, { data, loading, error }] = useDeletePostPlaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostPlaceMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostPlaceMutation, DeletePostPlaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostPlaceMutation, DeletePostPlaceMutationVariables>(DeletePostPlaceDocument, options);
      }
export type DeletePostPlaceMutationHookResult = ReturnType<typeof useDeletePostPlaceMutation>;
export type DeletePostPlaceMutationResult = Apollo.MutationResult<DeletePostPlaceMutation>;
export type DeletePostPlaceMutationOptions = Apollo.BaseMutationOptions<DeletePostPlaceMutation, DeletePostPlaceMutationVariables>;
export const AddPostDocument = gql`
    mutation AddPost($title: String!, $placeId: String!, $visitedDate: DateTime!, $isOpen: Boolean!, $categoryIdList: [String!]!, $detail: String, $urlList: [String!]!) {
  addPost(
    title: $title
    placeId: $placeId
    visitedDate: $visitedDate
    isOpen: $isOpen
    categoryIdList: $categoryIdList
    detail: $detail
    urlList: $urlList
  )
}
    `;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      placeId: // value for 'placeId'
 *      visitedDate: // value for 'visitedDate'
 *      isOpen: // value for 'isOpen'
 *      categoryIdList: // value for 'categoryIdList'
 *      detail: // value for 'detail'
 *      urlList: // value for 'urlList'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const GetMyPostsDocument = gql`
    query GetMyPosts($idFilter: String, $categoryIdsFilter: [String!], $placeIdFilter: String) {
  getMyPosts(
    idFilter: $idFilter
    categoryIdsFilter: $categoryIdsFilter
    placeIdFilter: $placeIdFilter
  ) {
    id
    userSettingId
    title
    visitedDateStr
    isOpen
    postPlace {
      id
      name
      prefectureCode
      url
      address
      latLon {
        lat
        lon
      }
    }
    categoryIdList
    urlList {
      url
      urlType
      urlInfo {
        title
        imageUrl
        siteName
      }
      embedHtml
    }
    detail
  }
}
    `;

/**
 * __useGetMyPostsQuery__
 *
 * To run a query within a React component, call `useGetMyPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyPostsQuery({
 *   variables: {
 *      idFilter: // value for 'idFilter'
 *      categoryIdsFilter: // value for 'categoryIdsFilter'
 *      placeIdFilter: // value for 'placeIdFilter'
 *   },
 * });
 */
export function useGetMyPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyPostsQuery, GetMyPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyPostsQuery, GetMyPostsQueryVariables>(GetMyPostsDocument, options);
      }
export function useGetMyPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyPostsQuery, GetMyPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyPostsQuery, GetMyPostsQueryVariables>(GetMyPostsDocument, options);
        }
export function useGetMyPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyPostsQuery, GetMyPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyPostsQuery, GetMyPostsQueryVariables>(GetMyPostsDocument, options);
        }
export type GetMyPostsQueryHookResult = ReturnType<typeof useGetMyPostsQuery>;
export type GetMyPostsLazyQueryHookResult = ReturnType<typeof useGetMyPostsLazyQuery>;
export type GetMyPostsSuspenseQueryHookResult = ReturnType<typeof useGetMyPostsSuspenseQuery>;
export type GetMyPostsQueryResult = Apollo.QueryResult<GetMyPostsQuery, GetMyPostsQueryVariables>;