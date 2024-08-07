import axios from "./axios";

export const getTask = async (id) => await axios.get(`/tasks/${id}`);
export const getTasks = async () => await axios.get("/tasks");

export const createTask = async (body) => await axios.post("/tasks", body);

export const updateTask = async (id, body) => await axios.put(`/tasks/${id}`, body);
export const deleteTask = async (id) => await axios.delete(`/tasks/${id}`);