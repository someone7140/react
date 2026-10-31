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
  ) {
    registerPost(
      title: $title
      contents: $contents
      status: $status
      tagNames: $tagNames
    )
  }
`;

export const updatePostMutation = gql`
  mutation UpdatePost(
    $id: String!
    $title: String!
    $contents: String!
    $status: PostStatus!
    $tagNames: [String!]!
  ) {
    updatePost(
      id: $id
      title: $title
      contents: $contents
      status: $status
      tagNames: $tagNames
    )
  }
`;

export const deletePostMutation = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id)
  }
`;

export const getMyPostsQuery = gql`
  query GetMyPosts($status: PostStatus, $id: String) {
    getMyPosts(status: $status, id: $id) {
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
