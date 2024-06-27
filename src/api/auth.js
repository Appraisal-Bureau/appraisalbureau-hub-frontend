import apiClient from 'services/apiService';

export const login = ({ email, password }) => {
  return apiClient.post('auth/local', {
    identifier: email,
    password: password,
  });
};

export const register = ({ username, email, password }) => {
  return apiClient.post('auth/local/register', {
    username: username,
    email: email,
    password: password,
  });
};

export const getLoggedInUser = () => {
  return apiClient.get('/users/me');
};
