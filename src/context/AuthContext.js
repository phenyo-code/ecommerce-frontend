import React, { createContext, useState, useContext } from 'react';

// Context creation
const AuthContext = createContext();

// Custom hook to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user will hold the current user's data
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate logging in (for now we can use mock credentials)
  const login = (email, password) => {
    // Mock authentication logic
    if (email === "admin@example.com" && password === "admin123") {
      setUser({ email, role: "admin" });
      setIsAuthenticated(true);
    } else if (email === "user@example.com" && password === "user123") {
      setUser({ email, role: "user" });
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  // Simulate logging out
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
