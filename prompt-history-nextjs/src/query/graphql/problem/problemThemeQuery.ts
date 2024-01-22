import { gql } from "@apollo/client";

export const addThemeAndQuestionMutationDocument = gql`
  mutation AddThemeAndQuestion(
    $themeTitle: String!
    $themeDescription: String
    $question: String!
  ) {
    insert_problem_themes_one(
      object: {
        title: $themeTitle
        description: $themeDescription
        problem_questions: { data: { contents: $question } }
      }
    ) {
      id
    }
  }
`;

export const addThemeMutationDocument = gql`
  mutation AddTheme($themeTitle: String!, $themeDescription: String) {
    insert_problem_themes_one(
      object: { title: $themeTitle, description: $themeDescription }
    ) {
      id
    }
  }
`;

export const getThemeByIdDocument = gql`
  query GetThemeByIdDocument($id: String!) {
    problem_themes(where: { id: { _eq: $id } }) {
      id
      title
      description
      problem_questions(order_by: { createDateTime: desc }) {
        id
        contents
      }
    }
  }
`;

export const addQuestionMutationDocument = gql`
  mutation AddQuestion($themeId: String!, $question: String!) {
    insert_problem_questions_one(
      object: { themeId: $themeId, contents: $question }
    ) {
      id
    }
  }
`;
