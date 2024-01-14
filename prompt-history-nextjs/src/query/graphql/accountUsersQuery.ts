import { gql } from "@apollo/client";

export const getAccountUsersByGmailQueryDocument = gql`
  query AccountUsersByGmail($gmail: String!) {
    account_users(where: { gmail: { _eq: $gmail } }) {
      id
      userSettingId
      name
      imageUrl
    }
  }
`;

export const getAccountUsersByUserSettingIdQueryDocument = gql`
  query AccountUsersByUserSettingId($userSettingId: String!) {
    account_users(where: { userSettingId: { _eq: $userSettingId } }) {
      id
    }
  }
`;

export const addAccountUsersByGmailMutationDocument = gql`
  mutation AddAccountUserByGmail(
    $id: String!
    $userSettingId: String!
    $name: String!
    $gmail: String!
  ) {
    insert_account_users_one(
      object: {
        id: $id
        userSettingId: $userSettingId
        name: $name
        gmail: $gmail
      }
    ) {
      id
    }
  }
`;
