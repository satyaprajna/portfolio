import axios from 'axios';
const API_URL= "http://localhost:3000";
const API_POST_URL="http://localhost:3000/create";
const API_GET_ALL_CONTACT_URL="http://localhost:3000/contact-list";
const API_GET_BY_ID_URL="http://localhost:3000/find-by";
const API_UPDATE_URL="http://localhost:3000/update-by-id";
const API_DELETE_URL="http://localhost:3000/delete-by-id";
export const createContact = (contactData) => axios.post(API_POST_URL,contactData);
export const getAllContacts = () => axios.get(API_GET_ALL_CONTACT_URL)
export const getContactById = (id) => axios.get(API_GET_BY_ID_URL+ '/'+ id);
export const deleteContact =  (id) => axios.delete(API_DELETE_URL + '/'+ id);
export const updateContact = (id, contact) =>axios.put(API_UPDATE_URL + '/' + id, contact);

const API_URL = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export const createContact = async (contactData) => {
  const response = await axios.post(`${API_URL}/create`, contactData);
  return response.data;
};

export const getAllContacts = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

export const getContactById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateContact = async (id, updateData) => {
  const response = await axios.put(`${API_URL}/update-contact-by-id/${id}`, updateData);
  return response.data;
};
