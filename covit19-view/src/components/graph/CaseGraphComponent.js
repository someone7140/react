import React from "react";
import {
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  getDisplayCaseYAxisTicks,
  getDisplayDateXAxis,
} from "../../service/GraphDisplayService";

export default function CaseGraphComponent(inputProps) {
  return (
    <div>
      <ResponsiveContainer width="95%" aspect={4.0 / 2.0}>
        <LineChart
          data={inputProps.caseData}
          margin={{ top: 15, left: 50, right: 40 }}
        >
          <XAxis // X軸
            dataKey="daily_date" // X軸の基準となるデータ項目名
            tickFormatter={(props) => {
              return getDisplayDateXAxis(props);
            }} // X軸を MM/DD形式で表示
          />
          <YAxis // Y軸
            domain={["dataMin", "dataMax"]}
            ticks={getDisplayCaseYAxisTicks(inputProps.caseData)} // Y軸表示
            unit="人" // Y軸の単位
          />
          <CartesianGrid // ガイド線の表示
            stroke="#ccc"
            strokeDasharray="3 3"
          />
          <Tooltip // ツールチップの表示
          />
          <Line // 陽性者数のデータを表示
            name="陽性者数"
            dataKey="cases" // キー
            stroke="orangered" // 線の色
            unit="人" //単位
          />
          <Line // 死者数のデータを表示
            name="死者数"
            dataKey="deaths" // キー
            stroke="gray" // 線の色
            unit="人" //単位
          />
          <Line // 退院者数のデータを表示
            name="退院者数"
            dataKey="discharge" // キー
            stroke="black" // 線の色
            unit="人" //単位
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
