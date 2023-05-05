import { useState } from "react";

import { OrganizationChart } from "primereact/organizationchart";

export default function NovelSettingChartComponent(prop) {
  const [chartData] = useState([
    {
      label: "登場人物",
      expanded: true,
      children: [
        {
          label: "山田一郎",
          expanded: true,
          children: [
            { label: "年齢", value: "32歳" },
            { label: "職業", value: "会社員" },
            { label: "居住地", value: "埼玉県" },
            {
              label: "趣味",
              children: [{ label: "寝ること" }, { label: "食べること" }],
            },
          ],
        },
        {
          label: "鈴木二実",
          expanded: true,
          children: [
            { label: "年齢", value: "26歳" },
            { label: "職業", value: "公務員" },
            { label: "居住地", value: "千葉県" },
            {
              label: "趣味",
              children: [{ label: "旅行" }, { label: "ランニング" }],
            },
          ],
        },
        {
          label: "田中三郎",
          expanded: true,
          children: [
            { label: "年齢", value: "19歳" },
            { label: "職業", value: "学生" },
            { label: "居住地", value: "神奈川県" },
            {
              label: "趣味",
              children: [{ label: "飲み会" }, { label: "スキー" }],
            },
          ],
        },
      ],
    },
  ]);

  const nodeTemplate = (node) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            fontWeight: 600,
          }}
        >
          {node.label}
        </div>
        <div>{node.value}</div>
      </div>
    );
  };

  return <OrganizationChart value={chartData} nodeTemplate={nodeTemplate} />;
}
