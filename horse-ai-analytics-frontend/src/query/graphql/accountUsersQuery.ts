import { gql } from "@apollo/client";

export const getAccountUsersByGmailQueryDocument = gql`
  mutation ValidateGoogleAuthCode($authCode: String!) {
    validateGoogleAuthCode(authCode: $authCode) {
      authToken
    }
  }
`;
