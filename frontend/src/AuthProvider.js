import React, {createContext, useContext} from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ isAuthenticated, triggerAuthStatusCheck, children }) => {
  return (
    <AuthContext.Provider value={{ isAuthenticated, triggerAuthStatusCheck }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;