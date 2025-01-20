import { gql } from "@apollo/client/core";

export const postResponseFragment = gql`
  fragment PostObj on PostResponse {
    id
    userSettingId
    userName
    userImageUrl
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
    }
    detail
  }
`;

export const addPostMutationDocument = gql`
  mutation AddPost(
    $title: String!
    $placeId: String!
    $visitedDate: DateTime!
    $isOpen: Boolean!
    $categoryIdList: [String!]!
    $detail: String
    $urlList: [String!]!
  ) {
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

export const editPostMutationDocument = gql`
  mutation EditPost(
    $id: String!
    $title: String!
    $placeId: String!
    $visitedDate: DateTime!
    $isOpen: Boolean!
    $categoryIdList: [String!]!
    $detail: String
    $urlList: [String!]!
  ) {
    editPost(
      id: $id
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

export const deletePostMutationDocument = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id)
  }
`;

export const getMyPostsQueryDocument = gql`
  query GetMyPosts(
    $idFilter: String
    $categoryIdsFilter: [String!]
    $placeIdFilter: String
    $isOrderPostDate: Boolean!
  ) {
    getMyPosts(
      idFilter: $idFilter
      categoryIdsFilter: $categoryIdsFilter
      placeIdFilter: $placeIdFilter
      isOrderPostDate: $isOrderPostDate
    ) {
      ...PostObj
    }
  }
`;

export const getOpenPostsQueryDocument = gql`
  query GetOpenPosts {
    getOpenPosts(userSettingId: null) {
      ...PostObj
    }
  }
`;

export const getOpenPostsWithAccountInfoQueryDocument = gql`
  query GetOpenPostsWithAccountInfo($userSettingId: String!) {
    getOpenPosts(userSettingId: $userSettingId) {
      ...PostObj
    }
    getAccountUserByUserSettingId(userSettingId: $userSettingId) {
      userSettingId
      name
      urlList
      detail
      imageUrl
    }
  }
`;
