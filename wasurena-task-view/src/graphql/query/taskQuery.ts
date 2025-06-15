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

export const createTaskMutationDocument = gql`
  mutation CreateTask(
    $title: String!
    $displayFlag: Boolean!
    $notificationFlag: Boolean!
    $categoryId: String
    $deadLineCheck: DeadLineCheck
    $deadLineCheckSubSetting: Map
    $detail: String
  ) {
    createTask(
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

export const updateTaskMutationDocument = gql`
  mutation UpdateTask(
    $id: String!
    $title: String!
    $displayFlag: Boolean!
    $notificationFlag: Boolean!
    $categoryId: String
    $deadLineCheck: DeadLineCheck
    $deadLineCheckSubSetting: Map
    $detail: String
  ) {
    updateTask(
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
    getTaskDefinitionById(taskDefinitionId: $taskDefinitionId) {
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
      id
      title
      displayFlag
      notificationFlag
      categoryId
      categoryName
      deadLineCheck
      deadLineCheckSubSetting
      latestExecDateTime
      isExceedDeadLine
    }
  }
`;

export const deleteTaskDefinitionMutationDocument = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id)
  }
`;

export const getTaskCategoriesForTaskDefinitionQueryDocument = gql`
  query GetTaskCategoriesForTaskDefinitionQuery {
    getTaskCategories {
      ...TaskCategoryObj
    }
  }
`;
