import { gql } from "urql";

export const createTaskCategoryMutationDocument = gql`
  mutation CreateTaskCategory($name: String!, $displayOrder: Int) {
    createCategory(input: { name: $name, displayOrder: $displayOrder })
  }
`;

export const getTaskCategoriesQueryDocument = gql`
  query GetTaskCategories {
    getTaskCategories {
      id
      name
      displayOrder
    }
  }
`;

export const deleteTaskCategoryMutationDocument = gql`
  mutation DeleteTaskCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;
