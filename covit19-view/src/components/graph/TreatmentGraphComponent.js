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
  getDisplayTreatmentDataYAxisTicks,
} from "../../service/GraphDisplayService";

export default function TreatmentGraphComponent(inputProps) {
  return (
    <div>
      <ResponsiveContainer width="95%" aspect={4.0 / 2.0}>
        <LineChart
          data={inputProps.treatmentData}
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
            ticks={getDisplayTreatmentDataYAxisTicks(inputProps.treatmentData)} // Y軸表示
            unit="人" // Y軸の単位
          />
          <CartesianGrid // ガイド線の表示
            stroke="#ccc"
            strokeDasharray="3 3"
          />
          <Tooltip // ツールチップの表示
          />
          <Line // 入院中のデータを表示
            name="入院中"
            dataKey="hospitalize" // キー
            stroke="black" // 線の色
            unit="人" //単位
          />
          <Line // 重症者数のデータを表示
            name="重症"
            dataKey="severe" // キー
            stroke="orangered" // 線の色
            unit="人" //単位
          />
          <Line // 症状確認中のデータを表示
            name="症状確認中"
            dataKey="symptom_confirming" // キー
            stroke="sienna" // 線の色
            unit="人" //単位
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
