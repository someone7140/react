import { createContext, useState } from "react";

export const AuthContext = createContext({
  authInfo: undefined,
  setAuthInfo: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(undefined);

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
