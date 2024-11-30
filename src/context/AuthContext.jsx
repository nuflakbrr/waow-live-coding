/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';

const defaultValue = {
  user: undefined,
  isLoading: false,
  setUser: (value) => null,
  logout: () => null,
};

const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = localStorage.getItem('user');
    const _user = getUser ? JSON.parse(getUser) : null;

    if (getUser) {
      setUser(_user);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    setUser(undefined);

    localStorage.clear();
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user) || '');
     
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
