import { GeographicPointServiceClient } from "../pb/geographicPoint_grpc_web_pb";
import {
  AddGeographicPointRequest,
  GetWeatherListByGeographicPointRequest,
  DeleteGeographicPointRequest,
  UpdateGeographicPointRequest,
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

// 地点の更新
export async function updateGeographicPoint(id, name, lat, lon, displayOrder) {
  const request = new UpdateGeographicPointRequest();
  request.setId(id);
  request.setName(name);
  request.setLat(lat);
  request.setLon(lon);
  request.setDisplayorder(displayOrder);

  try {
    const updateGeographicPointPromise = new Promise((resolve, reject) => {
      const authToken = getAuthTokenFromLocalStorage();
      // LocalStorageにトークンが無ければfalseで返す
      if (!authToken) {
        resolve({
          success: false,
        });
      } else {
        geographicPointService.updateGeographicPoint(
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
    return await updateGeographicPointPromise;
  } catch (_) {
    return { success: false };
  }
}

// 地点の削除
export async function deleteGeographicPoint(id) {
  const request = new DeleteGeographicPointRequest();
  request.setId(id);

  try {
    const deleteGeographicPointPromise = new Promise((resolve, reject) => {
      const authToken = getAuthTokenFromLocalStorage();
      // LocalStorageにトークンが無ければfalseで返す
      if (!authToken) {
        resolve({
          success: false,
        });
      } else {
        geographicPointService.deleteGeographicPoint(
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
    return await deleteGeographicPointPromise;
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
