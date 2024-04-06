import { gql } from "@apollo/client";

export const loginGoogleAuthCodeMutationDocument = gql`
  mutation LoginGoogleAuthCode($authCode: String!) {
    loginGoogleAuthCode(authCode: $authCode) {
      authToken
      userSettingId
      name
    }
  }
`;

export const validateGoogleAuthCodeMutationDocument = gql`
  mutation ValidateGoogleAuthCode($authCode: String!) {
    validateGoogleAuthCode(authCode: $authCode) {
      authToken
    }
  }
`;

export const addAccountUserFromGoogleMutationDocument = gql`
  mutation AddAccountUserFromGoogle(
    $authToken: String!
    $userSettingId: String!
    $name: String!
  ) {
    addAccountUserFromGoogle(
      authToken: $authToken
      userSettingId: $userSettingId
      name: $name
    ) {
      authToken
      userSettingId
      name
    }
  }
`;

export const getUserFromAuthHeaderQueryDocument = gql`
  query GetUserFromAuthHeader {
    getUserFromAuthHeader {
      authToken
      userSettingId
      name
    }
  }
`;

export const editAccountUserMutationDocument = gql`
  mutation EditAccountUser($userSettingId: String!, $name: String!) {
    editAccountUser(userSettingId: $userSettingId, name: $name) {
      authToken
      userSettingId
      name
    }
  }
`;
