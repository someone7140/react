import { gql } from "@apollo/client/core";

export const getUserAccountRegisterTokenFromGoogleAuthCodeQuery = gql`
  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {
    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {
      token
      name
      imageUrl
    }
  }
`;
