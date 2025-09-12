import { gql } from "urql";

export const taskDefinitionResponseFragment = gql`
  fragment TaskDefinitionObj on TaskDefinitionResponse {
    id
    title
    displayFlag
    notificationFlag
    categoryId
    categoryName
    deadLineCheck
    deadLineCheckSubSetting
    detail
  }
`;

export const taskCheckDisplayResponseFragment = gql`
  fragment TaskCheckDisplayObj on TaskCheckForListResponse {
    id
    title
    displayFlag
    notificationFlag
    categoryId
    categoryName
    deadLineCheck
    deadLineCheckSubSetting
    latestExecDateTime
    nextDeadLineDateTime
    isExceedDeadLine
  }
`;

export const createTaskDefinitionMutationDocument = gql`
  mutation CreateTaskDefinition(
    $title: String!
    $displayFlag: Boolean!
    $notificationFlag: Boolean!
    $categoryId: String
    $deadLineCheck: DeadLineCheck
    $deadLineCheckSubSetting: JSON
    $detail: String
  ) {
    createTaskDefinition(
      input: {
        title: $title
        displayFlag: $displayFlag
        notificationFlag: $notificationFlag
        categoryId: $categoryId
        deadLineCheck: $deadLineCheck
        deadLineCheckSubSetting: $deadLineCheckSubSetting
        detail: $detail
      }
    )
  }
`;

export const updateTaskDefinitionMutationDocument = gql`
  mutation UpdateTaskDefinition(
    $id: String!
    $title: String!
    $displayFlag: Boolean!
    $notificationFlag: Boolean!
    $categoryId: String
    $deadLineCheck: DeadLineCheck
    $deadLineCheckSubSetting: JSON
    $detail: String
  ) {
    updateTaskDefinition(
      id: $id
      input: {
        title: $title
        displayFlag: $displayFlag
        notificationFlag: $notificationFlag
        categoryId: $categoryId
        deadLineCheck: $deadLineCheck
        deadLineCheckSubSetting: $deadLineCheckSubSetting
        detail: $detail
      }
    )
  }
`;

export const getTaskDefinitionsQueryDocument = gql`
  query GetTaskDefinitions {
    getTaskDefinitions {
      ...TaskDefinitionObj
    }
  }
`;

export const getTaskDefinitionByIdQueryDocument = gql`
  query GetTaskDefinitionByIdAndCategory($taskDefinitionId: String!) {
    getTaskDefinitionById(id: $taskDefinitionId) {
      ...TaskDefinitionObj
    }
    getTaskCategories {
      ...TaskCategoryObj
    }
  }
`;

export const getTaskCheckDisplayListQueryDocument = gql`
  query GetTaskCheckDisplayList {
    getTaskCheckDisplayList {
      ...TaskCheckDisplayObj
    }
  }
`;

export const getTaskCheckDisplayListTopQueryDocument = gql`
  query GetTaskCheckDisplayListTop {
    getTaskCheckDisplayList {
      ...TaskCheckDisplayObj
    }
  }
`;

export const deleteTaskDefinitionMutationDocument = gql`
  mutation DeleteTaskDefinition($id: String!) {
    deleteTaskDefinition(id: $id)
  }
`;

export const getTaskCategoriesForTaskDefinitionQueryDocument = gql`
  query GetTaskCategoriesForTaskDefinitionQuery {
    getTaskCategories {
      ...TaskCategoryObj
    }
  }
`;
