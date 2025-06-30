import { gql } from "urql";

export const categoryResponseFragment = gql`
  fragment TaskCategoryObj on TaskCategoryResponse {
    id
    name
    displayOrder
  }
`;

export const getTaskCategoriesQueryDocument = gql`
  query GetTaskCategories {
    getTaskCategories {
      ...TaskCategoryObj
    }
  }
`;

export const getTaskCategoryByIdQueryDocument = gql`
  query GetTaskCategoryById($taskCategoryId: String!) {
    getTaskCategoryById(id: $taskCategoryId) {
      ...TaskCategoryObj
    }
  }
`;

export const createTaskCategoryMutationDocument = gql`
  mutation CreateTaskCategory($name: String!, $displayOrder: Int) {
    createCategory(input: { name: $name, displayOrder: $displayOrder })
  }
`;

export const updateTaskCategoryMutationDocument = gql`
  mutation UpdateTaskCategory(
    $id: String!
    $name: String!
    $displayOrder: Int
  ) {
    updateCategory(id: $id, input: { name: $name, displayOrder: $displayOrder })
  }
`;

export const deleteTaskCategoryMutationDocument = gql`
  mutation DeleteTaskCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;
