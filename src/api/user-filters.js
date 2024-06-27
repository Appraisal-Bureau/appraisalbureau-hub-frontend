import apiClient from 'services/apiService';

export const getSavedFilters = () => {
  return apiClient.get('/user-filters');
};

export const postSavedFilter = (filter) => {
  return apiClient.post('/user-filters', {
    params: filter,
  });
};
