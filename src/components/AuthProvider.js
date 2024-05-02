import React, { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { message } from "antd";
import { API, BEARER } from "../constants";
import { getToken } from "../helpers/auth.helpers";
import { ErrorBoundary } from "react-error-boundary";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const authToken = getToken();

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error(error);
      message.error("Error while getting logged in user details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user) => {
    setUserData(user);
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <AuthContext.Provider
        value={{ user: userData, setUser: handleUser, isLoading }}
      >
        {children}
      </AuthContext.Provider>
    </ErrorBoundary>
  );
};

export default AuthProvider;
