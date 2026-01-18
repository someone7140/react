import { gql } from "@apollo/client/core";

export const getNovelContentsQuery = gql`
  query GetNovelContents($novelId: String!) {
    myNovelById(novelId: $novelId) {
      id
      title
      description
    }
    novelContentsByNovelId(novelId: $novelId) {
      id
      chapterName
      novelId
      parentContentsId
      displayOrder
      contents
      description
    }
  }
`;

export const registerNovelContentsMutation = gql`
  mutation RegisterNovelContents(
    $inputs: [NovelContentsRegisterRequestInput!]!
  ) {
    registerNovelContents(inputs: $inputs)
  }
`;

export const deleteNovelContentMutation = gql`
  mutation DeleteNovelContentsById($id: String!) {
    deleteNovelContentsById(id: $id)
  }
`;

export const deleteNovelContentsMutation = gql`
  mutation DeleteNovelContentsByIds($ids: [String!]!) {
    deleteNovelContentsByIds(ids: $ids)
  }
`;
