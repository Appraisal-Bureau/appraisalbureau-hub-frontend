import apiClient from 'services/apiService';

export const getItems = (params) => {
  return apiClient.get('/items', {
    params: params,
  });
};
