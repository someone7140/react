import { gql } from "urql";

export const getUserRegisterTokenDocument = gql`
  query GetUserRegisterToken($authCode: String!) {
    getUserRegisterToken(lineAuthCode: $authCode) {
      token
      lineName
    }
  }
`;
