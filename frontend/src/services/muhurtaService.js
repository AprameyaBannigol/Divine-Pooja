import API from './api.js';

export const getMuhurtas = async (params = {}) => {
  const response = await API.get('/muhurta', { params });
  return response.data;
};

export const getMuhurtaById = async (id) => {
  const response = await API.get(`/muhurta/${id}`);
  return response.data;
};
