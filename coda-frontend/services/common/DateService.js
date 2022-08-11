// 日付文字列から表示用の文字列に変換
export function getDateStrDisplay(dateStr) {
  const dt = new Date(dateStr);
  return (
    dt.getFullYear() +
    "/" +
    (dt.getMonth() + 1) +
    "/" +
    dt.getDate() +
    " " +
    zeroFill(dt.getHours()) +
    ":" +
    zeroFill(dt.getMinutes()) +
    ":" +
    zeroFill(dt.getSeconds())
  );
}

// 日付文字列から表示用の文字列に変換（アイテム投稿用）
export function getDateStrForItemPostDisplay(dateStr) {
  const dt = new Date(dateStr);
  return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
}
// 日付文字列から表示用の文字列に変換（時間なし）
export function getDateStrDisplayExceptTime(dateStr) {
  const dt = new Date(dateStr);
  return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
}

// セール情報用
export function getDateStrSaleDisplay(dateStr) {
  const dt = new Date(dateStr);
  return (
    dt.getMonth() +
    1 +
    "月" +
    dt.getDate() +
    "日" +
    zeroFill(dt.getHours()) +
    "時"
  );
}

// ゼロ埋め
export function zeroFill(number) {
  const numStr = String(number);
  if (numStr.length < 2) {
    return "0" + numStr;
  }
  return numStr;
}
