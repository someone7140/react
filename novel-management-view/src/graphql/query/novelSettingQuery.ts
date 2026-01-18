import { gql } from "@apollo/client/core";

export const getNovelSettingsQuery = gql`
  query GetNovelSettings($novelId: String!) {
    myNovelById(novelId: $novelId) {
      id
      title
      description
    }
    novelSettingsByNovelId(novelId: $novelId) {
      id
      name
      novelId
      parentSettingId
      displayOrder
      attributes
      description
    }
  }
`;

export const registerNovelSettingsMutation = gql`
  mutation RegisterNovelSettings(
    $inputs: [NovelSettingRegisterRequestInput!]!
  ) {
    registerNovelSettings(inputs: $inputs)
  }
`;

export const deleteNovelSettingMutation = gql`
  mutation DeleteNovelSettingById($id: String!) {
    deleteNovelSettingById(id: $id)
  }
`;

export const deleteNovelSettingsMutation = gql`
  mutation DeleteNovelSettingsByIds($ids: [String!]!) {
    deleteNovelSettingByIds(ids: $ids)
  }
`;

export const getNovelSettingsByParentSettingIdQuery = gql`
  query GetNovelSettingsByParentSettingId($parentSettingId: String!) {
    novelSettingsByParentSettingId(parentSettingId: $parentSettingId) {
      id
      name
      novelId
      parentSettingId
      displayOrder
      attributes
      description
    }
  }
`;
