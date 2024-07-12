import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [jwt, setJwt] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth, jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
