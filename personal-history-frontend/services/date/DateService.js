function getDayJsObj() {
  const dayjs = require("dayjs");
  const utc = require("dayjs/plugin/utc");
  const timezone = require("dayjs/plugin/timezone");
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return dayjs;
}

export function getDisplayDateMinuteUnit(dateStr) {
  const dayjs = getDayJsObj();
  const dayjsTz = dayjs.tz(dateStr, "YYYY-MM-DD HH:mm:ss", "UTC");
  return dayjsTz.tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm");
}

export function getDiffHourFromNow(dateStr) {
  const dayjsFrom = getDayJsObj();
  const dayjsFromTz = dayjsFrom.tz(dateStr, "YYYY-MM-DD HH:mm:ss", "UTC");

  const dayjsTo = getDayJsObj();
  const dayjsToTz = dayjsTo().tz("UTC");

  return dayjsFromTz.diff(dayjsToTz, "h");
}

export function getTimeFromMonthStr(monthStr) {
  if (monthStr) {
    const date = new Date(monthStr + "/01");
    return date.getTime();
  } else {
    return undefined;
  }
}

export function getMonthStrFromTime(time) {
  if (time) {
    const date = new Date(time);
    const month = (date.getMonth() + 1).toString();
    return date.getFullYear() + "/" + (month.length == 1 ? "0" + month : month);
  } else {
    return undefined;
  }
}
