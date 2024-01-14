import { gql } from "@apollo/client";

export const verifyGoogleCodeCheckMutationDocument = gql`
  fragment VerifyGoogleCodeCheckInput on REST {
    authCode: String
  }

  mutation verifyGoogleCodeCheck($input: VerifyGoogleCodeCheckInput!) {
    verifyGoogleCodeCheck(input: $input)
      @rest(type: "Post", path: "/verifyGoogleCodeCheck", method: "POST") {
      authToken
    }
  }
`;

const AuthUserResponseFragment = gql`
  fragment AuthUserResponse on REST {
    authToken: String
    userSettingId: String
    name: String
    imageUrl: String
  }
`;

export const addAccountUserByGmailPostMutationDocument = gql`
  ${AuthUserResponseFragment}
  fragment AddAccountUserByGmailInput on REST {
    authToken: String
    userSettingId: String
    name: String
    imageUrl: String
  }

  mutation addAccountUserByGmail($input: AddAccountUserByGmailInput!) {
    addAccountUserByGmail(input: $input)
      @rest(type: "Post", path: "/addAccountUserByGmail", method: "POST") {
      ...AuthUserResponse
    }
  }
`;

export const loginByGoogleMutationDocument = gql`
  ${AuthUserResponseFragment}
  fragment LoginByGoogleInput on REST {
    authCode: String
  }

  mutation loginByGoogle($input: LoginByGoogleInput!) {
    loginByGoogle(input: $input)
      @rest(type: "Post", path: "/loginByGoogle", method: "POST") {
      ...AuthUserResponse
    }
  }
`;

export const verifyAuthTokenDocument = gql`
  ${AuthUserResponseFragment}
  fragment VerifyAuthTokenInput on REST {
    authToken: String
  }

  mutation verifyAuthToken($input: VerifyAuthTokenInput!) {
    verifyAuthToken(input: $input)
      @rest(type: "Post", path: "/verifyAuthToken", method: "POST") {
      ...AuthUserResponse
    }
  }
`;
