import { gql } from "urql";

export const createTaskExecuteMutationDocument = gql`
  mutation CreateTaskExecute($taskDefinitionId: String!, $memo: String) {
    createTaskExecute(
      input: { taskDefinitionId: $taskDefinitionId, memo: $memo }
    )
  }
`;

export const getTaskExecuteListByDefinitionIdQueryDocument = gql`
  query GetTaskExecuteListByDefinitionId($taskDefinitionId: String!) {
    getTaskExecuteListByDefinitionId(taskDefinitionId: $taskDefinitionId) {
      id
      taskDefinitionId
      executeDateTime
      memo
    }
  }
`;

export const deleteTaskExecuteMutationDocument = gql`
  mutation DeleteTaskExecute($taskExecuteId: String!) {
    deleteTaskExecute(taskExecuteId: $taskExecuteId)
  }
`;
