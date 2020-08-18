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
  getDisplayDateXAxis,
  getDisplayPcrYAxisTicks,
} from "../../service/GraphDisplayService";

const yAxisPercentages = [0, 50, 100];

export default function PcrGraphComponent(inputProps) {
  return (
    <div>
      <ResponsiveContainer width="95%" aspect={4.0 / 2.0}>
        <LineChart
          data={inputProps.pcrData}
          margin={{ top: 15, left: 50, right: 40 }}
        >
          <XAxis // X軸
            dataKey="daily_date" // X軸の基準となるデータ項目名
            tickFormatter={(props) => {
              return getDisplayDateXAxis(props);
            }} // X軸を MM/DD形式で表示
          />
          <YAxis // Y軸
            yAxisId="left"
            domain={["dataMin", "dataMax"]}
            ticks={getDisplayPcrYAxisTicks(inputProps.pcrData)} // Y軸表示
            unit="人" // Y軸の単位
          />
          <YAxis // Y軸
            yAxisId="right"
            orientation="right"
            domain={["dataMin", "dataMax"]}
            ticks={yAxisPercentages} // Y軸表示
            unit="%" // Y軸の単位
          />
          <CartesianGrid // ガイド線の表示
            stroke="#ccc"
            strokeDasharray="3 3"
          />
          <Tooltip // ツールチップの表示
          />
          <Line // PCR検査数のデータを表示
            name="PCR検査数"
            yAxisId="left"
            dataKey="pcr" // キー
            stroke="black" // 線の色
            unit="人" //単位
          />
          <Line // 陽性率のデータを表示
            name="陽性率"
            yAxisId="right"
            dataKey="casePercentage" // キー
            stroke="blue" // 線の色
            unit="%" //単位
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
