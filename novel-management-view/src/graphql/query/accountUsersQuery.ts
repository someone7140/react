import { gql } from "@apollo/client/core";

export const getUserAccountRegisterTokenFromGoogleAuthCodeQuery = gql`
  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {
    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode)
  }
`;

export const addUserAccountByGoogleAuthMutation = gql`
  mutation AddUserAccountByGoogleAuth(
    $registerToken: String!
    $userSettingId: String!
    $name: String!
  ) {
    addUserAccountByGoogleAuth(
      registerToken: $registerToken
      userSettingId: $userSettingId
      name: $name
    ) {
      token
      userSettingId
      name
      imageUrl
    }
  }
`;

export const getUserAccountFromAuthHeaderQuery = gql`
  query GetUserAccountFromAuthHeader {
    getUserAccountFromAuthHeader {
      token
      userSettingId
      name
      imageUrl
    }
  }
`;

export const loginByGoogleAuthMutation = gql`
  mutation LoginByGoogleAuth($authCode: String!) {
    loginByGoogleAuth(authCode: $authCode) {
      token
      userSettingId
      name
      imageUrl
    }
  }
`;
