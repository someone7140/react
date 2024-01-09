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
