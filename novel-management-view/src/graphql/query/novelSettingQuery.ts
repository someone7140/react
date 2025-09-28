import { gql } from "@apollo/client/core";

export const getNovelSettingsQuery = gql`
  query GetNovelSettings($novelId: String!) {
    getMyNovelById(novelId: $novelId) {
      id
      title
      description
    }
    getMyNovelSettings(novelId: $novelId) {
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
