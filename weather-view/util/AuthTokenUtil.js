const AUTH_STOLEN_TORAGE_KEY = "authToken";

export const setAuthTokenLocalStorage = (authToken) => {
  localStorage.setItem(AUTH_STOLEN_TORAGE_KEY, authToken);
};

export const getAuthTokenFromLocalStorage = () => {
  return localStorage.getItem(AUTH_STOLEN_TORAGE_KEY);
};

export const getAuthTokenMetaData = (authToken) => {
  const metadata = { authorization: "Bearer " + authToken };
  return metadata;
};
