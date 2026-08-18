import API from './api.js';

export const getPoojas = async (params = {}) => {
  const response = await API.get('/poojas', { params });
  return response.data;
};

export const getPoojaById = async (id) => {
  const response = await API.get(`/poojas/${id}`);
  return response.data;
};
