import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);

export const getTasks = (token) =>
  API.get("/tasks", { headers: { Authorization: `Bearer ${token}` } });
export const createTask = (task, token) =>
  API.post("/tasks", task, { headers: { Authorization: `Bearer ${token}` } });
export const updateTask = (id, updatedTask, token) =>
  API.put(`/tasks/${id}`, updatedTask, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTask = (id, token) =>
  API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const changeStatus = (id, token) =>
  API.patch(`/tasks/${id}/changestatus`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateTaskStatus = (id, status, token) =>
  API.put(
    `/tasks/${id}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
