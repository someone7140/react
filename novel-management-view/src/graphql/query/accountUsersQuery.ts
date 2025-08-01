import { gql } from "@apollo/client/core";

export const getUserAccountRegisterTokenFromGoogleAuthCode = gql`
  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {
    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {
      registerToken
    }
  }
`;
