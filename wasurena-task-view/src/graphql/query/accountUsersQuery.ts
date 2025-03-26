import { gql } from "urql";

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
      token
      userName
      userSettingId
      imageUrl
      isLineBotFollow
    }
  }
`;
