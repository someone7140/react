import { gql } from "@apollo/client/core";

export const accountUserResponseFragment = gql`
  fragment UserAccountAuthResponse on UserAccountAuthResponse {
    authToken
    name
    userSettingId
    imageUrl
    urlList
    detail
  }
`;

export const getUserAccountRegisterTokenFromGoogleAuthCodeQuery = gql`
  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {
    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {
      token
      name
      imageUrl
    }
  }
`;

export const getUserInfoFromAuthHeaderQuery = gql`
  query GetUserInfoFromAuthHeader {
    getUserInfoFromAuthHeader {
      ...UserAccountAuthResponse
    }
  }
`;

export const registerUserAccountFromGoogleMutation = gql`
  mutation RegisterUserAccountFromGoogle(
    $token: String!
    $name: String!
    $userSettingId: String!
    $urlList: [String!]!
    $detail: String
  ) {
    registerUserAccountFromGoogle(
      token: $token
      userSettingId: $userSettingId
      name: $name
      urlList: $urlList
      detail: $detail
    ) {
      ...UserAccountAuthResponse
    }
  }
`;

export const registerPostMutation = gql`
  mutation RegisterPost(
    $title: String!
    $contents: String!
    $status: PostStatus!
  ) {
    registerPost(title: $title, contents: $contents, status: $status)
  }
`;
