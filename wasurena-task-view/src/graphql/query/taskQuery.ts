import { gql } from "urql";

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

export const getTaskDefinitionsQueryDocument = gql`
  query GetTaskDefinitions {
    getTaskDefinitions {
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
