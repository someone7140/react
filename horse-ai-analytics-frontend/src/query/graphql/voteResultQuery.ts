import { gql } from "@apollo/client";

export const addVoteResultMutationDocument = gql`
  mutation AddVoteResult($input: VoteResultInputObject!) {
    addVoteResult(input: $input)
  }
`;

export const getRaceInfoForVoteResultQueryDocument = gql`
  query GetRaceInfoForVoteResult($raceDate: String!) {
    getRaceInfoDetailsByDate(raceDate: $raceDate) {
      id
      raceName
      analyticsUrl
      raceDate
      prompt
      memoList {
        id
        title
        contents
        evaluation
        categoryId
      }
    }
    getRaceMemoCategoryList {
      id
      name
      displayOrder
    }
  }
`;
