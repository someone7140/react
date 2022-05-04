import useSWR from "swr";
import Image from "next/image";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import LoadingComponent from "../../common/LoadingComponent";
import RegisterPointRefModal from "./RegisterPointRefModal";
import { getWeatherGeographicPoints } from "../../../grpc/api/GeographicPointApi";
import { getDateDisplayFromUnixTime } from "../../../util/DateUtil";

function getStickyCellStyle(width, zIndex, left) {
  return {
    position: "sticky",
    left: left,
    background: "white",
    width: width,
    zIndex: zIndex,
  };
}

export default function WeatherOfRegisteredPointsComponent(prop) {
  const { data, error } = useSWR(
    "/grpc/getWeatherListByGeographicPoint",
    async () => {
      return await getWeatherGeographicPoints();
    }
  );

  function renderWeatherInfo(weatherInfo) {
    return (
      <>
        <TableCell style={getStickyCellStyle(100, 90, 122)}>
          <RegisterPointRefModal
            weatherInfo={weatherInfo}
            onUpdateData={prop.onUpdateData}
          />
        </TableCell>
        <TableCell>
          <Image
            src={
              "http://openweathermap.org/img/wn/" +
              weatherInfo.getWeathericon() +
              "@2x.png"
            }
            width={40}
            height={40}
            alt={weatherInfo.getWeathericon()}
          />
        </TableCell>
        <TableCell>
          体感気温:{weatherInfo.getTempfeelslike()}°C
          <br />
          最低気温:{weatherInfo.getTempmin()}°C
          <br />
          最高気温:{weatherInfo.getTempmax()}°C
        </TableCell>
        <TableCell>
          雲量:{weatherInfo.getClouds()}%
          <br />
          降水量:{weatherInfo.getRainfall() ? weatherInfo.getRainfall() : 0}
          mm/3h
          <br />
        </TableCell>
        <TableCell>{weatherInfo.getHumidity()}%</TableCell>
        <TableCell>{weatherInfo.getWindspeed()}m/秒</TableCell>
        <TableCell>{weatherInfo.getPressure()}hpa</TableCell>
      </>
    );
  }

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
      if (weatherUnixTime != unixTime) {
        rowSpan = groupByUnixTime.get(unixTime)?.length;
        weatherUnixTime = unixTime;
      }
      return (
        <>
          <TableRow>
            {rowSpan && (
              <TableCell
                rowSpan={rowSpan}
                style={getStickyCellStyle(90, 90, 0)}
              >
                {getDateDisplayFromUnixTime(unixTime)}
              </TableCell>
            )}
            {renderWeatherInfo(weatherInfo)}
          </TableRow>
        </>
      );
    });
  }

  if (!data) return <LoadingComponent />;
  if (error || !data.success) return <div>failed to load</div>;
  if (data.weatherList.length == 0) {
    return <div>登録されている地点がありません</div>;
  }

  return (
    <Paper
      sx={{
        width: 400,
      }}
    >
      <TableContainer sx={{ height: "89vh", maxWidth: 400 }}>
        <Table
          stickyHeader
          style={{
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell style={getStickyCellStyle(90, 100, 0)}>日時</TableCell>
              <TableCell style={getStickyCellStyle(100, 100, 122)}>
                地点名
              </TableCell>
              <TableCell style={{ width: 40 }}>天気</TableCell>
              <TableCell style={{ width: 120 }}>気温</TableCell>
              <TableCell style={{ width: 110 }}>雲・降水量</TableCell>
              <TableCell style={{ width: 60 }}>湿度</TableCell>
              <TableCell style={{ width: 60 }}>風速</TableCell>
              <TableCell style={{ width: 80 }}>気圧</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderWeatherInfoList(data.weatherList)}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
