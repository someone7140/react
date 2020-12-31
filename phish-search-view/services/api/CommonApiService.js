import axios from "axios";
import axiosCookiejarSupport from "axios-cookiejar-support";

export function getClient() {
  axiosCookiejarSupport(axios);
  return axios.create({
    jar: true,
    withCredentials: true,
  });
}
