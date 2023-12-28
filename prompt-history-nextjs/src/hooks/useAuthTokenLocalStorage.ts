import { useLocalStorageState } from "ahooks";

export const useAuthTokenLocalStorage = () => {
  const [authToken, setAuthToken] = useLocalStorageState<string | undefined>(
    "authToken",
    { defaultValue: undefined }
  );
  const updateAuthToken = (token: string) => {
    setAuthToken(token);
  };
  const removeAuthToken = () => {
    setAuthToken(undefined);
  };

  return { authToken, updateAuthToken, removeAuthToken };
};
