import axios from "axios";

const API_URL = "http://localhost:5000";

const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" }
});

// Get token from localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all tasks
export const getTasks = async () => {
    const response = await api.get("/tasks", { headers: getAuthHeader() });
    // const response = await api.get("/tasks", { headers: getAuthHeader() });
    return response.data;
};

// Add a new task
export const addTask = async (title, description) => {
  
    const response = await api.post(
        "/tasks",
        { title, description },
        { headers: getAuthHeader() }
    );
    return response.data;
};

// Update task
export const updateTask = async (id, status) => {
  
  const response = await api.put(
      `/tasks/${id}`,
      { status },  // Only updating status
      { headers: getAuthHeader() }
  );
  return response.data;
};


// Delete task
export const deleteTask = async (id) => {
  
    await api.delete(`/tasks/${id}`, { headers: getAuthHeader() });
};
