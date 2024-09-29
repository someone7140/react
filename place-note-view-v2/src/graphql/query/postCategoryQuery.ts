import { gql } from "@apollo/client/core";

export const categoryResponseFragment = gql`
  fragment PostCategoryObj on PostCategoryResponse {
    id
    userSettingId
    name
    parentCategoryId
    displayOrder
    detail
  }
`;

export const addPostCategoryMutationDocument = gql`
  mutation AddPostCategory(
    $name: String!
    $parentCategoryId: String
    $displayOrder: Int
    $detail: String
  ) {
    addPostCategory(
      name: $name
      parentCategoryId: $parentCategoryId
      displayOrder: $displayOrder
      detail: $detail
    )
  }
`;

export const DeletePostCategoryMutationDocument = gql`
  mutation DeletePostCategory($id: String!) {
    deletePostCategory(id: $id)
  }
`;

export const getMyPostCategoriesQueryDocument = gql`
  ${categoryResponseFragment}
  query GetMyPostCategories($nameFilter: String) {
    getMyPostCategories(nameFilter: $nameFilter) {
      ...PostCategoryObj
    }
  }
`;

export const getMyPostCategoryByIdQueryDocument = gql`
  ${categoryResponseFragment}
  query GetMyPostCategoryById($idFilter: String!) {
    getMyPostCategoryById(idFilter: $idFilter) {
      ...PostCategoryObj
    }
  }
`;
