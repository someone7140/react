const AUTH_STORAGE_TOKEN_KEY = "authToken";

export const setAuthTokenLocalStorage = (authToken) => {
  localStorage.setItem(AUTH_STORAGE_TOKEN_KEY, authToken);
};

export const getAuthTokenFromLocalStorage = () => {
  return localStorage.getItem(AUTH_STORAGE_TOKEN_KEY);
};

export const getAuthTokenMetaData = (authToken) => {
  const metadata = { authorization: "Bearer " + authToken };
  return metadata;
};
