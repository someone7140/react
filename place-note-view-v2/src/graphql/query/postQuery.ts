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
