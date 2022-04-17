import { VerifyAuthTokenRequest } from "../pb/authenticationUser_pb";
import { VerifyGoogleAuthCodeRequest } from "../pb/authenticationUser_pb";
import { AuthenticationUserServiceClient } from "../pb/authenticationUser_grpc_web_pb";
import {
  getAuthTokenFromLocalStorage,
  getAuthTokenMetaData,
} from "../../util/AuthTokenUtil";

const authenticationUserService = new AuthenticationUserServiceClient(
  process.env.API_HOST
);

// authCodeからユーザ情報を取得
export async function getUserFromGoogleAuthCodeApi(authCode) {
  const request = new VerifyGoogleAuthCodeRequest();
  request.setGoogleauthcode(authCode);

  try {
    const verifyGoogleAuthCodePromise = new Promise((resolve, reject) => {
      authenticationUserService.verifyGoogleAuthCode(
        request,
        null,
        (err, response) => {
          if (err) {
            reject({
              success: false,
            });
          } else {
            resolve({
              success: true,
              user: {
                id: response.getId(),
                name: response.getName(),
                authToken: response.getAuthtoken(),
              },
            });
          }
        }
      );
    });
    return await verifyGoogleAuthCodePromise;
  } catch (_) {
    return { success: false };
  }
}

// LocalStorageのトークンからユーザ情報を取得
export async function getUserInfoFromLocalStorageToken(
  authInfoContext,
  setAuthInfoAtContext
) {
  const request = new VerifyAuthTokenRequest();

  try {
    const verifyAuthTokenProcessPromise = new Promise((resolve, reject) => {
      // コンテキストにユーザ情報があればそのまま返す
      if (authInfoContext) {
        resolve({
          success: true,
          user: authInfoContext,
        });
      } else {
        const authToken = getAuthTokenFromLocalStorage();
        // LocalStorageにトークンが無ければfalseで返す
        if (!authToken) {
          resolve({
            success: false,
          });
        } else {
          authenticationUserService.verifyAuthToken(
            request,
            getAuthTokenMetaData(authToken),
            (err, response) => {
              if (err) {
                reject({
                  success: false,
                });
              } else {
                const loginUser = {
                  id: response.getId(),
                  name: response.getName(),
                  authToken: authToken,
                };
                // コンテキストにユーザ情報をセット
                setAuthInfoAtContext(loginUser);
                resolve({
                  success: true,
                  user: loginUser,
                });
              }
            }
          );
        }
      }
    });
    return await verifyAuthTokenProcessPromise;
  } catch (_) {
    return { success: false };
  }
}
