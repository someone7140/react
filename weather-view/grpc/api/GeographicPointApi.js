import { GeographicPointServiceClient } from "../pb/geographicPoint_grpc_web_pb";
import { AddGeographicPointRequest } from "../pb/geographicPoint_pb";
import {
  getAuthTokenFromLocalStorage,
  getAuthTokenMetaData,
} from "../../util/AuthTokenUtil";

const geographicPointService = new GeographicPointServiceClient(
  process.env.API_HOST
);

// 地点の新規登録
export async function addGeographicPoint(name, lat, lon) {
  const request = new AddGeographicPointRequest();
  request.setName(name);
  request.setLat(lat);
  request.setLon(lon);

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
