import { gql } from "@apollo/client/core";

export const getNovelSettingsQuery = gql`
  query GetNovelSettings($novelId: String!) {
    getMyNovelById(novelId: $novelId) {
      id
      title
      description
    }
    getNovelSettingsByNovelId(novelId: $novelId) {
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
  mutation RegisterNovelSettings($inputs: [NovelSettingRegisterInput!]!) {
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
    getNovelSettingsByParentSettingId(parentId: $parentSettingId) {
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
