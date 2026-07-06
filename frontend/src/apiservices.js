import axios from 'axios';

const API_BASE = 'https://portfolio-f8mi.onrender.com';

export const createContact = async (contactData) => {
  const response = await axios.post(`${API_BASE}/api/contacts/create`, contactData);
  return response.data;
};

export const getAllContacts = async () => {
  const response = await axios.get(`${API_BASE}/api/contacts/all`);
  return response.data;
};

export const getContactById = async (id) => {
  const response = await axios.get(`${API_BASE}/api/contacts/contact/${id}`);
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(`${API_BASE}/api/contacts/delete/${id}`);
  return response.data;
};

export const updateContact = async (id, updateData) => {
  const response = await axios.put(`${API_BASE}/api/contacts/update/${id}`, updateData);
  return response.data;
};
