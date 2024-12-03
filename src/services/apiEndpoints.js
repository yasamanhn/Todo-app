const BASE_URL = "https://6734c937a042ab85d11b9e03.mockapi.io/api";

export const API_ENDPOINTS = {
  TASKS: `${BASE_URL}/todos`,
  TASK_BY_ID: (taskId) => `${BASE_URL}/todos/${taskId}`,
};
