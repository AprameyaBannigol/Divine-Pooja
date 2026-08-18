import API from './api.js';

export const getPriests = async (params = {}) => {
  const response = await API.get('/priests', { params });
  return response.data;
};

export const getPriestById = async (id) => {
  const response = await API.get(`/priests/${id}`);
  return response.data;
};
