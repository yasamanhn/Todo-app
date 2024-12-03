import axiosInstance from "../plugins/axiosInstance";

import { TODO_ENDPOINT } from "./apiEndpoints";

export const fetchTasks = async () => {
  try {
    const response = await axiosInstance.get(TODO_ENDPOINT);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await axiosInstance.post(TODO_ENDPOINT, task);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeTask = async (taskId) => {
  try {
    await axiosInstance.delete(`${TODO_ENDPOINT}/${taskId}`);
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axiosInstance.put(
      `${TODO_ENDPOINT}/${taskId}`,
      updatedTask
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
