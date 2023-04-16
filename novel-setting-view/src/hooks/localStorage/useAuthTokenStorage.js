import { useLocalStorage } from "primereact/hooks";

export const useAuthTokenStorage = () => {
  const [authToken, setAuthToken] = useLocalStorage(undefined, "authToken");
  const updateAuthToken = (token) => {
    setAuthToken(token);
  };
  const removeAuthToken = () => {
    setAuthToken(undefined);
  };

  return { authToken, updateAuthToken, removeAuthToken };
};
