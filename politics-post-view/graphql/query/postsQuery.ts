import { gql } from "@apollo/client/core";

export const postResponseFragment = gql`
  fragment PostResponse on PostResponse {
    id
    title
    contents
    status
    updateAt
    tags {
      id
      tagName
    }
    userAccount {
      userSettingId
      name
      imageUrl
    }
    commitAt
  }
`;

export const registerPostMutation = gql`
  mutation RegisterPost(
    $title: String!
    $contents: String!
    $status: PostStatus!
    $tagNames: [String!]!
    $description: String
  ) {
    registerPost(
      title: $title
      contents: $contents
      status: $status
      tagNames: $tagNames
      description: $description
    )
  }
`;

export const getMyPostsQuery = gql`
  query GetMyPosts($status: PostStatus) {
    getMyPosts(status: $status) {
      ...PostResponse
    }
  }
`;

export const getPostTags = gql`
  query GetPostTags($keyword: String!, $isOpenOnly: Boolean!) {
    getPostTags(keyword: $keyword, isOpenOnly: $isOpenOnly) {
      id
      tagName
    }
  }
`;
