import API from './api.js';

export const getBlogs = async (params = {}) => {
  const response = await API.get('/blogs', { params });
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await API.get(`/blogs/${id}`);
  return response.data;
};
