import apiClient from 'services/apiService';

export const getSavedFilters = async () => {
  return await apiClient.get('/user-filters');
};

export const postSavedFilter = async (filter) => {
  return await apiClient.post('/user-filters', {
    params: filter,
  });
};
