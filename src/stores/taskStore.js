import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      try {
        const response = await axios.get(
          "https://6734c937a042ab85d11b9e03.mockapi.io/api/todos"
        );
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },

    async addTask(task) {
      try {
        const response = await axios.post(
          "https://6734c937a042ab85d11b9e03.mockapi.io/api/todos",
          task
        );
        this.tasks.push(response.data);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },

    async removeTask(taskId) {
      try {
        await axios.delete(
          `https://6734c937a042ab85d11b9e03.mockapi.io/api/todos/${taskId}`
        );
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },

    async updateTask(taskId, updatedTask) {
      try {
        const response = await axios.put(
          `https://6734c937a042ab85d11b9e03.mockapi.io/api/todos/${taskId}`,
          updatedTask
        );
        const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = response.data;
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
  },
});
