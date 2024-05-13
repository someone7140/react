import { gql } from "@apollo/client";

export const addMemoCategoryMutationDocument = gql`
  mutation AddMemoCategory($name: String!, $displayOrder: Int) {
    addMemoCategory(name: $name, displayOrder: $displayOrder)
  }
`;

export const editMemoCategoryMutationDocument = gql`
  mutation EditMemoCategory($id: String!, $name: String!, $displayOrder: Int) {
    editMemoCategory(id: $id, name: $name, displayOrder: $displayOrder)
  }
`;

export const getRaceMemoCategoryListQueryDocument = gql`
  query GetRaceMemoCategoryList($idFilter: String) {
    getRaceMemoCategoryList(idFilter: $idFilter) {
      id
      name
      displayOrder
    }
  }
`;

export const deleteMemoCategoryMutationDocument = gql`
  mutation DeleteMemoCategory($id: String!) {
    deleteMemoCategory(id: $id)
  }
`;
