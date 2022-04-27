import { GeographicPointServiceClient } from "../pb/geographicPoint_grpc_web_pb";
import {
  AddGeographicPointRequest,
  GetWeatherListByGeographicPointRequest,
} from "../pb/geographicPoint_pb";
import {
  getAuthTokenFromLocalStorage,
  getAuthTokenMetaData,
} from "../../util/AuthTokenUtil";

const geographicPointService = new GeographicPointServiceClient(
  process.env.API_HOST
);

// 地点の新規登録
export async function addGeographicPoint(name, lat, lon, displayOrder) {
  const request = new AddGeographicPointRequest();
  request.setName(name);
  request.setLat(lat);
  request.setLon(lon);
  request.setDisplayorder(displayOrder);

  try {
    const addGeographicPointPromise = new Promise((resolve, reject) => {
      const authToken = getAuthTokenFromLocalStorage();
      // LocalStorageにトークンが無ければfalseで返す
      if (!authToken) {
        resolve({
          success: false,
        });
      } else {
        geographicPointService.addGeographicPoint(
          request,
          getAuthTokenMetaData(authToken),
          (err, response) => {
            if (err) {
              reject({
                success: false,
              });
            } else {
              resolve({
                success: true,
              });
            }
          }
        );
      }
    });
    return await addGeographicPointPromise;
  } catch (_) {
    return { success: false };
  }
}

// 登録されている地点の天気一覧を取得
export async function getWeatherGeographicPoints() {
  try {
    const addGeographicPointPromise = new Promise((resolve, reject) => {
      const authToken = getAuthTokenFromLocalStorage();
      // LocalStorageにトークンが無ければfalseで返す
      if (!authToken) {
        resolve({
          success: false,
        });
      } else {
        const request = new GetWeatherListByGeographicPointRequest();
        geographicPointService.getWeatherListByGeographicPoint(
          request,
          getAuthTokenMetaData(authToken),
          (err, response) => {
            if (err) {
              reject({
                success: false,
              });
            } else {
              console.log(response.getWeatherbygeographicpointList());
              resolve({
                success: true,
                weatherList: response.getWeatherbygeographicpointList(),
              });
            }
          }
        );
      }
    });
    return await addGeographicPointPromise;
  } catch (_) {
    return { success: false };
  }
}
