import { gql } from "@apollo/client/core";

export const getMyNovelsQuery = gql`
  query GetMyNovels {
    getMyNovels {
      id
      title
      description
    }
  }
`;

export const addNovelMutation = gql`
  mutation AddNovel($title: String!, $description: String) {
    addNovel(title: $title, description: $description)
  }
`;

export const editNovelMutation = gql`
  mutation EditNovel($id: String!, $title: String!, $description: String) {
    editNovel(id: $id, title: $title, description: $description)
  }
`;

export const deleteNovelMutation = gql`
  mutation DeleteNovel($id: String!) {
    deleteNovel(id: $id)
  }
`;
