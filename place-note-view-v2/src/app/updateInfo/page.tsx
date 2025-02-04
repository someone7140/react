"use client";

import { Card, Typography } from "@material-tailwind/react";

import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  const TABLE_HEAD = ["日時", "タイトル", "詳細"];
  const TABLE_ROWS = [
    {
      date: "2025/02/04",
      title: "リリース",
      detail: "サイトをリリース",
    },
  ];

  return (
    <>
      <div className={pageTitleStyle()}>機能等の更新履歴</div>
      <Card>
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
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none"
                    >
                      {head}
                    </Typography>
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
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {detail}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
