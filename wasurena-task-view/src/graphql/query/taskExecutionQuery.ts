import { gql } from "urql";

export const createTaskExecuteMutationDocument = gql`
  mutation CreateTaskExecute($taskDefinitionId: String!, $memo: String) {
    createTaskExecute(
      input: { taskDefinitionId: $taskDefinitionId, memo: $memo }
    ) {
      id
      latestExecDateTime
      nextDeadLineDateTime
      isExceedDeadLine
    }
  }
`;

export const getTaskExecuteListByDefinitionIdQueryDocument = gql`
  query GetTaskExecuteListByDefinitionId(
    $taskDefinitionId: String!
    $startDateTime: DateTime
    $endDateTime: DateTime
  ) {
    getTaskExecuteListByDefinitionId(
      taskDefinitionId: $taskDefinitionId
      startDateTime: $startDateTime
      endDateTime: $endDateTime
    ) {
      id
      taskDefinitionId
      executeDateTime
      memo
    }
  }
`;

export const deleteTaskExecuteMutationDocument = gql`
  mutation DeleteTaskExecute($taskExecuteId: String!) {
    deleteTaskExecute(id: $taskExecuteId)
  }
`;
