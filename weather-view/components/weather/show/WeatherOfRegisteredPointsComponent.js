import useSWR from "swr";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import LoadingComponent from "../../common/LoadingComponent";
import { getWeatherGeographicPoints } from "../../../grpc/api/GeographicPointApi";

export default function WeatherOfRegisteredPointsComponent() {
  const { data, error } = useSWR(
    "/grpc/getWeatherListByGeographicPoint",
    async () => {
      return await getWeatherGeographicPoints();
    }
  );

  function renderWeatherInfo(weatherInfo) {}

  function renderWeatherInfoList(weatherInfoList) {
    // UnixTime単位で天気の情報をgroupByする
    const groupByUnixTime = weatherInfoList.reduce(function (
      result,
      weatherInfo
    ) {
      const unixTime = weatherInfo.getUnixtime();
      if (result.has(unixTime)) {
        result.set(unixTime, [...result.get(unixTime), weatherInfo]);
      } else {
        result.set(unixTime, [weatherInfo]);
      }
      return result;
    },
    new Map());

    let weatherUnixTime = 0;
    return weatherInfoList.map((weatherInfo) => {
      let rowSpan = undefined;
      // unixTimeが前と違うか
      const unixTime = weatherInfo.getUnixtime();
      if (weatherUnixTime == unixTime) {
        rowSpan = groupByUnixTime.get(unixTime)?.length;
      }
      return (
        <>
          <TableRow>{renderWeatherInfo(weather)}</TableRow>
        </>
      );
    });
  }

  if (!data) return <LoadingComponent />;
  if (error || !data.success) return <div>failed to load</div>;

  return <>天気の一覧</>;
}
