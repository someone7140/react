import { gql } from "@apollo/client";

export const getAccountUsersByGmailQueryDocument = gql`
  query AccountUsersByGmail($gmail: String!) {
    account_users(where: { gmail: { _eq: $gmail } }) {
      id
    }
  }
`;
