import axios from "axios";
import {
  getInterval,
  getStartDateFromRange,
  translateDateToLong,
} from "./DateService";

// サマリーのAPI取得
export function setSummaryDataFromApi(searchCondition, setApiResult) {
  const { startDate, endDate, interval } = getPostDateParam(searchCondition);
  const failResult = { success: false };
  const postParam = {
    start_date: translateDateToLong(startDate),
    end_date: translateDateToLong(endDate),
    interval_date: interval,
  };
  try {
    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/sum_analitycs`, postParam)
      .then((results) => {
        if (results.status === 200) {
          setApiResult({ success: true, data: results.data });
        } else {
          setApiResult(failResult);
        }
      })
      .catch(() => {
        setApiResult(failResult);
      });
  } catch (_) {
    setApiResult(failResult);
  }
}

// 都道府県別APIでの取得
export function setPrefectureDataFromApi(
  searchCondition,
  prefectureCode,
  setApiResult
) {
  const { startDate, endDate, interval } = getPostDateParam(searchCondition);
  const failResult = { success: false };
  const postParam = {
    start_date: translateDateToLong(startDate),
    end_date: translateDateToLong(endDate),
    interval_date: interval,
    prefecture_code_list: [prefectureCode],
  };
  try {
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/prefecture_analitycs`,
        postParam
      )
      .then((results) => {
        if (results.status === 200) {
          setApiResult({ success: true, data: results.data[0] });
        } else {
          setApiResult(failResult);
        }
      })
      .catch(() => {
        setApiResult(failResult);
      });
  } catch (_) {
    setApiResult(failResult);
  }
}

function getPostDateParam(searchCondition) {
  const now = new Date();
  const { startDate, endDate } =
    searchCondition.selectRange === "directInput"
      ? {
          startDate: searchCondition.startDate,
          endDate: searchCondition.endDate,
        }
      : {
          startDate: getStartDateFromRange(searchCondition.selectRange),
          endDate: now,
        };
  const interval = getInterval(startDate, endDate);
  return { startDate: startDate, endDate: endDate, interval: interval };
}
