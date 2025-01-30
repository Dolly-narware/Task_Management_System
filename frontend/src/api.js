import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/tasks';

export const fetchTasks = async () => axios.get(API_URL);
export const addTask = async (title) => axios.post(API_URL, { title });
export const updateTask = async (id, completed) => axios.put(`${API_URL}/${id}`, { completed });
export const deleteTask = async (id) => axios.delete(`${API_URL}/${id}`);