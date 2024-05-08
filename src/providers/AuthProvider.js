import React, { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { message } from "antd";
import apiClient from "../services/apiService";
import { ErrorBoundary } from "react-error-boundary";
import { getToken } from "../helpers/auth.helpers";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const authToken = getToken();

  const fetchLoggedInUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await apiClient.get("/users/me");
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
      fetchLoggedInUser();
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
