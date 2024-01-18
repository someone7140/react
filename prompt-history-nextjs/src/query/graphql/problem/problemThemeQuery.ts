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
