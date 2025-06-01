"use client";

import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const TABLE_HEAD = ["日時", "タイトル", "詳細"];
  const TABLE_ROWS = [
    {
      date: "2025/05/27",
      title: "投稿の位置検索作の追加",
      detail: "キーワードと現在位置で投稿を検索できる",
    },
    {
      date: "2025/03/03",
      title: "各種改修",
      detail:
        "都道府県の追加、位置情報の追加、リロード時の編集内容保持、その他細かい修正",
    },
    {
      date: "2025/02/04",
      title: "リリース",
      detail: "サイトをリリース",
    },
  ];

  return (
    <>
      <div className={pageTitleStyle()}>機能等の更新履歴</div>
      <div className=" max-w-[97%]">
        <table className="table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, i) => {
                let classes =
                  "border-b border-blue-gray-100 bg-blue-gray-50 p-4";

                if (i == 0) {
                  classes = classes + " rounded-tl-xl";
                }
                if (i == TABLE_HEAD.length - 1) {
                  classes = classes + " rounded-tr-xl";
                }

                return (
                  <th key={head} className={classes}>
                    <div className="font-normal leading-none">{head}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ date, title, detail }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={date}>
                  <td className={classes}>
                    <div className="font-normal">{date}</div>
                  </td>
                  <td className={`${classes} min-w-[90px]`}>
                    <div className="font-normal">{title}</div>
                  </td>
                  <td className={classes}>
                    <div className="font-normal">{detail}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
