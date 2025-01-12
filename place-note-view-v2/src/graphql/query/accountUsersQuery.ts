import { gql } from "@apollo/client/core";

export const accountUserResponseFragment = gql`
  fragment AccountUserObj on AccountUserResponse {
    token
    userSettingId
    name
    urlList
    detail
    imageUrl
  }
`;

export const googleAuthCodeVerifyMutationDocument = gql`
  mutation GoogleAuthCodeVerify($authCode: String!) {
    googleAuthCodeVerify(authCode: $authCode) {
      token
    }
  }
`;

export const loginByGoogleAuthCodeMutationDocument = gql`
  mutation LoginByGoogleAuthCode($authCode: String!) {
    loginByGoogleAuthCode(authCode: $authCode) {
      ...AccountUserObj
    }
  }
`;

export const addAccountUserByGoogleMutationDocument = gql`
  mutation AddAccountUserByGoogle(
    $authToken: String!
    $userSettingId: String!
    $name: String!
    $urlList: [String!]!
    $detail: String
    $file: Upload
  ) {
    addAccountUserByGoogle(
      authToken: $authToken
      userSettingId: $userSettingId
      name: $name
      urlList: $urlList
      detail: $detail
      imageFile: $file
    ) {
      ...AccountUserObj
    }
  }
`;

export const editAccountUserMutationDocument = gql`
  mutation EditAccountUser(
    $userSettingId: String!
    $name: String!
    $urlList: [String!]!
    $detail: String
    $file: Upload
  ) {
    editAccountUser(
      userSettingId: $userSettingId
      name: $name
      urlList: $urlList
      detail: $detail
      imageFile: $file
    ) {
      ...AccountUserObj
    }
  }
`;

export const getAccountUserByTokenQueryDocument = gql`
  query GetAccountUserByToken {
    getAccountUserByToken {
      ...AccountUserObj
    }
  }
`;
