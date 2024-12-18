import { gql } from "@apollo/client/core";

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

export const getMyPostsQueryDocument = gql`
  query GetMyPosts(
    $idFilter: String
    $categoryIdsFilter: [String!]
    $placeIdFilter: String
  ) {
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
