import { gql } from "urql";

export const createTaskExecuteMutationDocument = gql`
  mutation CreateTaskExecute($taskDefinitionId: String!, $memo: String) {
    createTaskExecute(
      input: { taskDefinitionId: $taskDefinitionId, memo: $memo }
    )
  }
`;
