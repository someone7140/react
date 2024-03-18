import { gql } from "@apollo/client";

export const getRaceInfoFromUrlQueryDocument = gql`
  query GetRaceInfoFromUrl($url: String!) {
    getRaceInfoFromUrl(url: $url) {
      raceName
      raceDateYyyyMmDd
      prompt
      odds {
        oddsUrl
        oddsList {
          horseName
          odds
        }
      }
    }
  }
`;

export const addRaceInfoMutationDocument = gql`
  mutation AddRaceInfo(
    $raceName: String!
    $analyticsUrl: String
    $raceDate: String!
    $prompt: String
    $memoList: [RaceMemoInputObject!]!
  ) {
    addRaceInfo(
      input: {
        raceName: $raceName
        analyticsUrl: $analyticsUrl
        raceDate: $raceDate
        prompt: $prompt
        memoList: $memoList
      }
    )
  }
`;
