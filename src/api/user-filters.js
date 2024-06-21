import apiClient from 'services/apiService';

export const getSavedFilters = () => {
  return apiClient.get('/user-filters').then((response) => response.data);
};

export const postSavedFilter = (filter) => {
  return apiClient
    .post('/user-filters', {
      params: filter,
    })
    .then((response) => response.data);
};
