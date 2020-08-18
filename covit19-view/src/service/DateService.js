import { RANGE_DATE } from "../constants/Covit19Constants";

// 期間の選択範囲を参照して開始日付を返す
export function getStartDateFromRange(rangeValue, inputStartDate) {
  const rangeObj = RANGE_DATE.find((r) => r.value === rangeValue);
  if (rangeObj && rangeObj.value !== "directInput") {
    const dateCount =
      rangeObj.unit === "week" ? rangeObj.range * 7 : rangeObj.range * 30;
    var dt = new Date();
    dt.setDate(dt.getDate() - dateCount);
    return dt;
  } else {
    return inputStartDate;
  }
}

// 期間の選択範囲を参照して終了日付を返す
export function getEndDateFromRange(rangeValue, inputEndDate) {
  const rangeObj = RANGE_DATE.find((r) => r.value === rangeValue);
  if (rangeObj && rangeObj.value !== "directInput") {
    return new Date();
  } else {
    return inputEndDate;
  }
}

// 日付型のオブジェクトをyyyyMMdd形式のLong型で返す
export function translateDateToLong(d) {
  const dateStr =
    d.getFullYear().toString() +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    d.getDate().toString().padStart(2, "0");
  return parseInt(dateStr);
}

// 入力された日付情報を元に適切なインターバルを返す
export function getInterval(startDate, endDate) {
  const termDay = (endDate - startDate) / 86400000;
  if (termDay > 180) {
    return 7;
  } else {
    return Math.floor(termDay / 31) + 1;
  }
}
