import axios from "axios";
import {
  storeTwitterLinkData,
  updateTwitterLinkData,
} from "./LocalStorageService";

export function makeLink(dispatch, input, key, _) {
  const postData = {
    userId: input.userId,
    wordList: input.word ? input.word.split(" ") : [],
    isIncludeReply: input.isIncludeReply,
    isIncludeReTweet: input.isIncludeReTweet,
    isQuestionary: input.isQuestionary,
    minimumFavoriteCounts: input.minimumFavoriteCounts,
    minimumRetweetCounts: input.minimumRetweetCounts,
    minimumReplyCounts: input.minimumReplyCounts,
    since: input.isStartDateSet
      ? convertDateForApi(input.startDate)
      : undefined,
    until: input.isEndDateSet ? convertDateForApi(input.endDate) : undefined,
    sort: input.isRecent ? "recent" : undefined,
  };
  try {
    axios
      .post(
        `${process.env.REACT_APP_TWITTER_LINK_DOMAIN}/twitter_search`,
        postData
      )
      .then((results) => {
        if (results.status === 200) {
          if (key) {
            updateTwitterLinkData(input, results.data.url, key);
          } else {
            storeTwitterLinkData(input, results.data.url);
          }
          succeedTwitterLinkDispatch(dispatch);
        } else {
          failedTwitterLinkDispatch(dispatch);
        }
      })
      .catch(() => {
        failedTwitterLinkDispatch(dispatch);
      });
  } catch (e) {
    failedTwitterLinkDispatch(dispatch);
  }
}

function convertDateForApi(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function failedTwitterLinkDispatch(dispatch) {
  dispatch({
    type: "MAKE_LINK",
    errorFlg: true,
    localStorageReadFlg: false,
  });
}

function succeedTwitterLinkDispatch(dispatch) {
  dispatch({
    type: "MAKE_LINK",
    errorFlg: false,
    localStorageReadFlg: true,
  });
}
