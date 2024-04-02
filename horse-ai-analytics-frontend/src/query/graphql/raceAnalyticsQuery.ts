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

export const getMyRaceInfoListQueryDocument = gql`
  query GetMyRaceInfoList($filter: RaceInfoListFilterInputObject) {
    getMyRaceInfoList(filter: $filter) {
      id
      raceName
      raceDate
    }
  }
`;

export const getRaceInfoDetailQueryDocument = gql`
  query GetRaceInfoDetail($raceInfoId: String!) {
    getRaceInfoDetail(raceInfoId: $raceInfoId) {
      id
      raceName
      analyticsUrl
      raceDate
      prompt
      memoList {
        id
        title
        contents
      }
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

export const deleteRaceInfoMutationDocument = gql`
  mutation DeleteRaceInfo($raceInfoId: String!) {
    deleteRaceInfo(raceInfoId: $raceInfoId)
  }
`;
