import apiClient from 'services/apiService';

export const getItems = (params) => {
  return apiClient
    .get('/items', {
      params: params,
    })
    .then((response) => response.data);
};

export const getItemById = (id) => {
  return apiClient
    .get('/items', {
      id: id,
    })
    .then((response) => response.data);
};
