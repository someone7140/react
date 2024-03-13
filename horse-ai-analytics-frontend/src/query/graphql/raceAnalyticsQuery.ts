import { gql } from "@apollo/client";

export const getRaceInfoFromUrlDocument = gql`
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
