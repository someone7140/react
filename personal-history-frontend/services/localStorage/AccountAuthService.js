export function setAuthTokenToLocalStorage(token) {
  localStorage.setItem("authToken", token);
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem("authToken");
}

export function deleteAuthTokenLocalStorage() {
  localStorage.removeItem("authToken");
}
