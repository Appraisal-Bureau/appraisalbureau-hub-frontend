import { message } from 'antd';
import { AuthContext } from 'context/AuthContext';
import { getToken } from 'helpers/auth.helpers';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import apiClient from 'services/apiService';

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const authToken = getToken();

  const fetchLoggedInUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await apiClient.get('/users/me');
      setUserData(data);
    } catch (error) {
      console.error(error);
      message.error('Error while getting logged in user details');
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
