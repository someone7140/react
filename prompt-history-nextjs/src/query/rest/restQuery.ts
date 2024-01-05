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
