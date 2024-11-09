import { Cell, Pie, PieChart, Tooltip } from "recharts";

const data01 = [
  {
    name: "Group A",
    value: 400,
    color: "aqua",
  },
  {
    name: "Group B",
    value: 300,
    color: "green",
  },
  {
    name: "Group C",
    value: 300,
    color: "red",
  },
  {
    name: "Group D",
    value: 200,
    color: "yellow",
  },
  {
    name: "Group E",
    value: 290,
    color: "orange",
  },
  {
    name: "Group F",
    value: 189,
    color: "gray",
  },
];

type PiChartsLabelType = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
};

const RADIAN = Math.PI / 180;

export default function Home() {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: PiChartsLabelType) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x < cx ? x + 20 : x - 10}
        y={y < cy ? y : y + 10}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {data01[index].name}
      </text>
    );
  };

  return (
    <div>
      <PieChart width={900} height={300}>
        <Pie
          data={data01}
          cx="50%"
          cy="50%"
          dataKey="value"
          outerRadius={130}
          innerRadius={70}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <text x={450} y={150} textAnchor="middle" dominantBaseline="middle">
          真ん中のテキスト
        </text>
        <Tooltip />
      </PieChart>
    </div>
  );
}
