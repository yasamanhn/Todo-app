import axios from "axios";
import { API_ENDPOINTS } from "./apiEndpoints";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.TASKS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(API_ENDPOINTS.TASKS, task);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeTask = async (taskId) => {
  try {
    await axios.delete(API_ENDPOINTS.TASK_BY_ID(taskId));
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(
      API_ENDPOINTS.TASK_BY_ID(taskId),
      updatedTask
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
