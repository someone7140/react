import { gql } from "urql";

export const accountUserResponseFragment = gql`
  fragment AccountUserObj on UserAccountResponse {
    token
    userName
    userSettingId
    imageUrl
    isLineBotFollow
  }
`;

export const getUserRegisterTokenQueryDocument = gql`
  query GetUserRegisterToken($authCode: String!) {
    getUserRegisterToken(lineAuthCode: $authCode) {
      token
      lineName
    }
  }
`;

export const createUserAccountMutationDocument = gql`
  mutation CreateUserAccount(
    $authToken: String!
    $userName: String!
    $userSettingId: String!
  ) {
    createUserAccount(
      input: {
        authToken: $authToken
        userName: $userName
        userSettingId: $userSettingId
      }
    ) {
      ...AccountUserObj
    }
  }
`;

export const updateUserAccountMutationDocument = gql`
  mutation UpdateUserAccount($userName: String!, $userSettingId: String!) {
    updateUserAccount(
      input: { userName: $userName, userSettingId: $userSettingId }
    ) {
      ...AccountUserObj
    }
  }
`;

export const getUserAccountFromAuthHeaderQueryDocument = gql`
  query GetUserAccountFromAuthHeader {
    getUserAccountFromAuthHeader {
      ...AccountUserObj
    }
  }
`;

export const getRegisteredUserQueryDocument = gql`
  query GetRegisteredUser($authCode: String!) {
    getRegisteredUser(lineAuthCode: $authCode) {
      ...AccountUserObj
    }
  }
`;
