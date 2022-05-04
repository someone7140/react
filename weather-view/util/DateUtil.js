// unixTimeから表示用の文字列に変換
export function getDateDisplayFromUnixTime(unixTime) {
  const dt = new Date(unixTime * 1000);
  return (
    dt.getFullYear() +
    "/" +
    (dt.getMonth() + 1) +
    "/" +
    dt.getDate() +
    " " +
    dt.getHours() +
    "時"
  );
}
