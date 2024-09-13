import { gql } from "@apollo/client/core";

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
      token
      userSettingId
      name
      imageUrl
    }
  }
`;

export const addAccountUserByGoogleMutationDocument = gql`
  mutation AddAccountUserByGoogle(
    $authToken: String!
    $userSettingId: String!
    $name: String!
    $file: Upload
  ) {
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

export const editAccountUserMutationDocument = gql`
  mutation EditAccountUser(
    $userSettingId: String!
    $name: String!
    $file: Upload
  ) {
    editAccountUser(
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

export const getAccountUserByTokenQueryDocument = gql`
  query getAccountUserByToken {
    getAccountUserByToken {
      token
      userSettingId
      name
      imageUrl
    }
  }
`;
