import API from './api.js';

export const getTemples = async (params = {}) => {
  const response = await API.get('/temples', { params });
  return response.data;
};

export const getTempleById = async (id) => {
  const response = await API.get(`/temples/${id}`);
  return response.data;
};
