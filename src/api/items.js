import apiClient from 'services/apiService';

export const getItems = (params) =>
  apiClient.get('/items', {
    params: params,
  });
