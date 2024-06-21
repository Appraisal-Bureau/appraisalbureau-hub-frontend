import apiClient from 'services/apiService';

export const login = ({ email, password }) => {
  return apiClient
    .post('auth/local', {
      identifier: email,
      password: password,
    })
    .then((response) => response.data);
};

export const register = ({ username, email, password }) => {
  return apiClient
    .post('auth/local/register', {
      username: username,
      email: email,
      password: password,
    })
    .then((response) => response.data);
};

export const getLoggedInUser = () => {
  return apiClient.get('/users/me').then((response) => response.data);
};
